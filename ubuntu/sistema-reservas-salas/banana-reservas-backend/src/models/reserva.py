from src.models.user import db
from datetime import datetime

class Reserva(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    local = db.Column(db.String(100), nullable=False)
    sala = db.Column(db.String(100), nullable=False)
    data_inicio = db.Column(db.DateTime, nullable=False)
    data_fim = db.Column(db.DateTime, nullable=False)
    responsavel = db.Column(db.String(100), nullable=False)
    cafe = db.Column(db.Boolean, default=False)
    quantidade_pessoas = db.Column(db.Integer, nullable=True)
    descricao = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Reserva {self.sala} - {self.responsavel}>'

    def to_dict(self):
        return {
            'id': self.id,
            'local': self.local,
            'sala': self.sala,
            'data_inicio': self.data_inicio.isoformat() if self.data_inicio else None,
            'data_fim': self.data_fim.isoformat() if self.data_fim else None,
            'responsavel': self.responsavel,
            'cafe': self.cafe,
            'quantidade_pessoas': self.quantidade_pessoas,
            'descricao': self.descricao,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    def validate_horario(self):
        """Valida se o horário de início é anterior ao horário de fim"""
        if self.data_inicio >= self.data_fim:
            return False, "A data/hora de início deve ser anterior à data/hora de fim"
        return True, ""

    @staticmethod
    def check_conflito_horario(local, sala, data_inicio, data_fim, reserva_id=None):
        """Verifica se há conflito de horário para a mesma sala e local"""
        query = Reserva.query.filter(
            Reserva.local == local,
            Reserva.sala == sala,
            Reserva.data_fim > data_inicio,
            Reserva.data_inicio < data_fim
        )
        
        # Se estamos editando uma reserva, excluir ela da verificação
        if reserva_id:
            query = query.filter(Reserva.id != reserva_id)
        
        conflito = query.first()
        return conflito is not None, conflito

