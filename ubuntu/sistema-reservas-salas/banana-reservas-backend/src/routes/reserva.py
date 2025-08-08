from flask import Blueprint, jsonify, request
from src.models.reserva import Reserva, db
from datetime import datetime

reserva_bp = Blueprint('reserva', __name__)

@reserva_bp.route('/reservas', methods=['GET'])
def get_reservas():
    """Lista todas as reservas"""
    try:
        reservas = Reserva.query.order_by(Reserva.data_inicio.asc()).all()
        return jsonify([reserva.to_dict() for reserva in reservas])
    except Exception as e:
        return jsonify({'erro': 'Erro ao buscar reservas', 'detalhes': str(e)}), 500

@reserva_bp.route('/reservas', methods=['POST'])
def create_reserva():
    """Cria uma nova reserva"""
    try:
        data = request.json
        
        # Validação de campos obrigatórios
        campos_obrigatorios = ['local', 'sala', 'data_inicio', 'data_fim', 'responsavel']
        for campo in campos_obrigatorios:
            if not data.get(campo):
                return jsonify({'erro': f'Campo obrigatório: {campo}'}), 400
        
        # Conversão de datas
        try:
            data_inicio = datetime.fromisoformat(data['data_inicio'].replace('Z', '+00:00'))
            data_fim = datetime.fromisoformat(data['data_fim'].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({'erro': 'Formato de data inválido. Use ISO 8601 (YYYY-MM-DDTHH:MM:SS)'}), 400
        
        # Validação de horário
        if data_inicio >= data_fim:
            return jsonify({'erro': 'A data/hora de início deve ser anterior à data/hora de fim'}), 400
        
        # Verificação de conflito de horário
        tem_conflito, reserva_conflito = Reserva.check_conflito_horario(
            data['local'], data['sala'], data_inicio, data_fim
        )
        
        if tem_conflito:
            return jsonify({
                'erro': 'Choque de horário detectado',
                'mensagem': 'Esta sala já está reservada para este período',
                'conflito': reserva_conflito.to_dict() if reserva_conflito else None
            }), 409
        
        # Validação de café e quantidade de pessoas
        cafe = data.get('cafe', False)
        quantidade_pessoas = data.get('quantidade_pessoas')
        
        if cafe and not quantidade_pessoas:
            return jsonify({'erro': 'Quando café é solicitado, a quantidade de pessoas é obrigatória'}), 400
        
        # Criação da reserva
        reserva = Reserva(
            local=data['local'],
            sala=data['sala'],
            data_inicio=data_inicio,
            data_fim=data_fim,
            responsavel=data['responsavel'],
            cafe=cafe,
            quantidade_pessoas=quantidade_pessoas if cafe else None,
            descricao=data.get('descricao', '')
        )
        
        db.session.add(reserva)
        db.session.commit()
        
        return jsonify({
            'mensagem': 'Reserva criada com sucesso',
            'reserva': reserva.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': 'Erro interno do servidor', 'detalhes': str(e)}), 500

@reserva_bp.route('/reservas/<int:reserva_id>', methods=['GET'])
def get_reserva(reserva_id):
    """Busca uma reserva específica"""
    try:
        reserva = Reserva.query.get_or_404(reserva_id)
        return jsonify(reserva.to_dict())
    except Exception as e:
        return jsonify({'erro': 'Reserva não encontrada'}), 404

@reserva_bp.route('/reservas/<int:reserva_id>', methods=['PUT'])
def update_reserva(reserva_id):
    """Atualiza uma reserva existente"""
    try:
        reserva = Reserva.query.get_or_404(reserva_id)
        data = request.json
        
        # Atualização dos campos
        if 'local' in data:
            reserva.local = data['local']
        if 'sala' in data:
            reserva.sala = data['sala']
        if 'responsavel' in data:
            reserva.responsavel = data['responsavel']
        if 'descricao' in data:
            reserva.descricao = data['descricao']
        
        # Atualização de datas se fornecidas
        data_inicio_nova = reserva.data_inicio
        data_fim_nova = reserva.data_fim
        
        if 'data_inicio' in data:
            try:
                data_inicio_nova = datetime.fromisoformat(data['data_inicio'].replace('Z', '+00:00'))
            except ValueError:
                return jsonify({'erro': 'Formato de data_inicio inválido'}), 400
        
        if 'data_fim' in data:
            try:
                data_fim_nova = datetime.fromisoformat(data['data_fim'].replace('Z', '+00:00'))
            except ValueError:
                return jsonify({'erro': 'Formato de data_fim inválido'}), 400
        
        # Validação de horário
        if data_inicio_nova >= data_fim_nova:
            return jsonify({'erro': 'A data/hora de início deve ser anterior à data/hora de fim'}), 400
        
        # Verificação de conflito (excluindo a própria reserva)
        tem_conflito, reserva_conflito = Reserva.check_conflito_horario(
            reserva.local, reserva.sala, data_inicio_nova, data_fim_nova, reserva_id
        )
        
        if tem_conflito:
            return jsonify({
                'erro': 'Choque de horário detectado',
                'mensagem': 'Esta sala já está reservada para este período',
                'conflito': reserva_conflito.to_dict() if reserva_conflito else None
            }), 409
        
        # Atualização das datas
        reserva.data_inicio = data_inicio_nova
        reserva.data_fim = data_fim_nova
        
        # Atualização de café e quantidade de pessoas
        if 'cafe' in data:
            reserva.cafe = data['cafe']
            if data['cafe'] and 'quantidade_pessoas' in data:
                reserva.quantidade_pessoas = data['quantidade_pessoas']
            elif not data['cafe']:
                reserva.quantidade_pessoas = None
        
        if 'quantidade_pessoas' in data and reserva.cafe:
            reserva.quantidade_pessoas = data['quantidade_pessoas']
        
        # Validação final de café
        if reserva.cafe and not reserva.quantidade_pessoas:
            return jsonify({'erro': 'Quando café é solicitado, a quantidade de pessoas é obrigatória'}), 400
        
        reserva.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'mensagem': 'Reserva atualizada com sucesso',
            'reserva': reserva.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': 'Erro ao atualizar reserva', 'detalhes': str(e)}), 500

@reserva_bp.route('/reservas/<int:reserva_id>', methods=['DELETE'])
def delete_reserva(reserva_id):
    """Exclui uma reserva"""
    try:
        reserva = Reserva.query.get_or_404(reserva_id)
        db.session.delete(reserva)
        db.session.commit()
        
        return jsonify({'mensagem': 'Reserva excluída com sucesso'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': 'Erro ao excluir reserva', 'detalhes': str(e)}), 500

@reserva_bp.route('/reservas/conflitos', methods=['POST'])
def check_conflitos():
    """Verifica conflitos de horário sem criar a reserva"""
    try:
        data = request.json
        
        # Validação de campos obrigatórios
        campos_obrigatorios = ['local', 'sala', 'data_inicio', 'data_fim']
        for campo in campos_obrigatorios:
            if not data.get(campo):
                return jsonify({'erro': f'Campo obrigatório: {campo}'}), 400
        
        # Conversão de datas
        try:
            data_inicio = datetime.fromisoformat(data['data_inicio'].replace('Z', '+00:00'))
            data_fim = datetime.fromisoformat(data['data_fim'].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({'erro': 'Formato de data inválido'}), 400
        
        # Verificação de conflito
        reserva_id = data.get('reserva_id')  # Para edição
        tem_conflito, reserva_conflito = Reserva.check_conflito_horario(
            data['local'], data['sala'], data_inicio, data_fim, reserva_id
        )
        
        return jsonify({
            'tem_conflito': tem_conflito,
            'conflito': reserva_conflito.to_dict() if reserva_conflito else None
        })
        
    except Exception as e:
        return jsonify({'erro': 'Erro ao verificar conflitos', 'detalhes': str(e)}), 500

# Rotas auxiliares para dados de formulário
@reserva_bp.route('/locais', methods=['GET'])
def get_locais():
    """Lista todos os locais únicos das reservas"""
    try:
        locais = db.session.query(Reserva.local).distinct().all()
        return jsonify([local[0] for local in locais if local[0]])
    except Exception as e:
        return jsonify({'erro': 'Erro ao buscar locais', 'detalhes': str(e)}), 500

@reserva_bp.route('/salas', methods=['GET'])
def get_salas():
    """Lista todas as salas únicas das reservas"""
    try:
        local = request.args.get('local')
        if local:
            salas = db.session.query(Reserva.sala).filter(Reserva.local == local).distinct().all()
        else:
            salas = db.session.query(Reserva.sala).distinct().all()
        return jsonify([sala[0] for sala in salas if sala[0]])
    except Exception as e:
        return jsonify({'erro': 'Erro ao buscar salas', 'detalhes': str(e)}), 500

