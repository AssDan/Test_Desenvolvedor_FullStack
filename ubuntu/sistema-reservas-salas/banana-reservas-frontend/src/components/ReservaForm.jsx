import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { X, Save, AlertCircle } from 'lucide-react'

const ReservaForm = ({ reserva, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    local: '',
    sala: '',
    data_inicio: '',
    data_fim: '',
    responsavel: '',
    cafe: false,
    quantidade_pessoas: '',
    descricao: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Preencher formulário se estiver editando
  useEffect(() => {
    if (reserva) {
      // Converter datas para formato datetime-local
      const dataInicio = new Date(reserva.data_inicio)
      const dataFim = new Date(reserva.data_fim)
      
      setFormData({
        local: reserva.local || '',
        sala: reserva.sala || '',
        data_inicio: formatDateTimeLocal(dataInicio),
        data_fim: formatDateTimeLocal(dataFim),
        responsavel: reserva.responsavel || '',
        cafe: reserva.cafe || false,
        quantidade_pessoas: reserva.quantidade_pessoas || '',
        descricao: reserva.descricao || ''
      })
    }
  }, [reserva])

  const formatDateTimeLocal = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      cafe: checked,
      quantidade_pessoas: checked ? prev.quantidade_pessoas : ''
    }))
    
    if (errors.cafe) {
      setErrors(prev => ({
        ...prev,
        cafe: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Campos obrigatórios
    if (!formData.local.trim()) {
      newErrors.local = 'Local é obrigatório'
    }
    if (!formData.sala.trim()) {
      newErrors.sala = 'Sala é obrigatória'
    }
    if (!formData.data_inicio) {
      newErrors.data_inicio = 'Data/hora de início é obrigatória'
    }
    if (!formData.data_fim) {
      newErrors.data_fim = 'Data/hora de fim é obrigatória'
    }
    if (!formData.responsavel.trim()) {
      newErrors.responsavel = 'Responsável é obrigatório'
    }

    // Validação de datas
    if (formData.data_inicio && formData.data_fim) {
      const inicio = new Date(formData.data_inicio)
      const fim = new Date(formData.data_fim)
      
      // Verificar se as datas são válidas
      if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
        newErrors.data_inicio = 'Data/hora inválida'
        newErrors.data_fim = 'Data/hora inválida'
      } else if (inicio >= fim) {
        newErrors.data_fim = 'Data/hora de fim deve ser posterior à data/hora de início'
      } else {
        // Verificar se a data não é no passado
        const agora = new Date()
        if (inicio < agora) {
          newErrors.data_inicio = 'Data/hora de início não pode ser no passado'
        }
      }
    }

    // Validação de café
    if (formData.cafe && (!formData.quantidade_pessoas || formData.quantidade_pessoas <= 0)) {
      newErrors.quantidade_pessoas = 'Quantidade de pessoas é obrigatória quando café é solicitado'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      // Preparar dados para envio
      const submitData = {
        ...formData,
        data_inicio: formData.data_inicio ? new Date(formData.data_inicio).toISOString() : null,
        data_fim: formData.data_fim ? new Date(formData.data_fim).toISOString() : null,
        quantidade_pessoas: formData.cafe && formData.quantidade_pessoas ? 
          parseInt(formData.quantidade_pessoas) : null
      }

      await onSubmit(submitData)
    } catch (error) {
      // Erro será tratado pelo componente pai
      console.error('Erro ao salvar reserva:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {reserva ? 'Editar Reserva' : 'Nova Reserva'}
              </CardTitle>
              <CardDescription>
                {reserva ? 'Altere os dados da reserva' : 'Preencha os dados para criar uma nova reserva'}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Local e Sala */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="local">Local/Filial *</Label>
                <Input
                  id="local"
                  name="local"
                  value={formData.local}
                  onChange={handleInputChange}
                  placeholder="Ex: Filial Centro"
                  className={errors.local ? 'border-red-500' : ''}
                />
                {errors.local && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.local}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="sala">Sala *</Label>
                <Input
                  id="sala"
                  name="sala"
                  value={formData.sala}
                  onChange={handleInputChange}
                  placeholder="Ex: Sala de Reunião A"
                  className={errors.sala ? 'border-red-500' : ''}
                />
                {errors.sala && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.sala}
                  </p>
                )}
              </div>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data_inicio">Data/Hora de Início *</Label>
                <Input
                  id="data_inicio"
                  name="data_inicio"
                  type="datetime-local"
                  value={formData.data_inicio}
                  onChange={handleInputChange}
                  className={errors.data_inicio ? 'border-red-500' : ''}
                />
                {errors.data_inicio && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.data_inicio}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_fim">Data/Hora de Fim *</Label>
                <Input
                  id="data_fim"
                  name="data_fim"
                  type="datetime-local"
                  value={formData.data_fim}
                  onChange={handleInputChange}
                  className={errors.data_fim ? 'border-red-500' : ''}
                />
                {errors.data_fim && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.data_fim}
                  </p>
                )}
              </div>
            </div>

            {/* Responsável */}
            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável *</Label>
              <Input
                id="responsavel"
                name="responsavel"
                value={formData.responsavel}
                onChange={handleInputChange}
                placeholder="Nome do responsável pela reserva"
                className={errors.responsavel ? 'border-red-500' : ''}
              />
              {errors.responsavel && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.responsavel}
                </p>
              )}
            </div>

            {/* Café */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cafe"
                  checked={formData.cafe}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="cafe">Solicitar café</Label>
              </div>
              
              {formData.cafe && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="quantidade_pessoas">Quantidade de Pessoas *</Label>
                  <Input
                    id="quantidade_pessoas"
                    name="quantidade_pessoas"
                    type="number"
                    min="1"
                    value={formData.quantidade_pessoas}
                    onChange={handleInputChange}
                    placeholder="Número de pessoas"
                    className={errors.quantidade_pessoas ? 'border-red-500' : ''}
                  />
                  {errors.quantidade_pessoas && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.quantidade_pessoas}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                placeholder="Descrição opcional da reunião"
                rows={3}
              />
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Salvando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {reserva ? 'Atualizar' : 'Criar'} Reserva
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReservaForm

