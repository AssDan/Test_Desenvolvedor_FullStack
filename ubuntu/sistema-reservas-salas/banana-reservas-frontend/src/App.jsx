import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Plus, Edit, Trash2, Calendar, MapPin, User, Coffee, Clock } from 'lucide-react'
import ReservaForm from './components/ReservaForm'
import ConfirmDialog from './components/ConfirmDialog'
import './App.css'

const API_BASE_URL = 'http://localhost:5001/api'

function App() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingReserva, setEditingReserva] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [reservaToDelete, setReservaToDelete] = useState(null)
  const [error, setError] = useState('')

  // Carregar reservas ao inicializar
  useEffect(() => {
    fetchReservas()
  }, [])

  const fetchReservas = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/reservas`)
      if (!response.ok) {
        throw new Error('Erro ao carregar reservas')
      }
      const data = await response.json()
      setReservas(data)
      setError('')
    } catch (err) {
      setError('Erro ao carregar reservas: ' + err.message)
      console.error('Erro ao carregar reservas:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateReserva = async (dadosReserva) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosReserva),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao criar reserva')
      }

      await fetchReservas() // Recarregar lista
      setShowForm(false)
      setError('')
    } catch (err) {
      setError(err.message)
      throw err // Re-throw para o formulário tratar
    }
  }

  const handleUpdateReserva = async (dadosReserva) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservas/${editingReserva.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosReserva),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao atualizar reserva')
      }

      await fetchReservas() // Recarregar lista
      setShowForm(false)
      setEditingReserva(null)
      setError('')
    } catch (err) {
      setError(err.message)
      throw err // Re-throw para o formulário tratar
    }
  }

  const handleDeleteReserva = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reservas/${reservaToDelete.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.erro || 'Erro ao excluir reserva')
      }

      await fetchReservas() // Recarregar lista
      setShowDeleteConfirm(false)
      setReservaToDelete(null)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const openEditForm = (reserva) => {
    setEditingReserva(reserva)
    setShowForm(true)
  }

  const openDeleteConfirm = (reserva) => {
    setReservaToDelete(reserva)
    setShowDeleteConfirm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingReserva(null)
  }

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDateOnly = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return date.toLocaleDateString('pt-BR')
  }

  const formatTimeOnly = (dateTimeString) => {
    const date = new Date(dateTimeString)
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando reservas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Reserva de Salas
          </h1>
          <p className="text-gray-600">Banana Ltda - Gerencie suas reservas de salas de reunião</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Reserva
          </Button>
        </div>

        {/* Reservas List */}
        <div className="space-y-4">
          {reservas.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma reserva encontrada
                </h3>
                <p className="text-gray-600 mb-4">
                  Comece criando sua primeira reserva de sala
                </p>
                <Button 
                  onClick={() => setShowForm(true)}
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeira Reserva
                </Button>
              </CardContent>
            </Card>
          ) : (
            reservas.map((reserva) => (
              <Card key={reserva.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {reserva.local} - {reserva.sala}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <User className="w-4 h-4" />
                        {reserva.responsavel}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditForm(reserva)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteConfirm(reserva)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDateOnly(reserva.data_inicio)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          {formatTimeOnly(reserva.data_inicio)} - {formatTimeOnly(reserva.data_fim)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {reserva.cafe && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Coffee className="w-3 h-3" />
                            Café para {reserva.quantidade_pessoas} pessoas
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  {reserva.descricao && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm text-gray-600">{reserva.descricao}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Form Modal */}
        {showForm && (
          <ReservaForm
            reserva={editingReserva}
            onSubmit={editingReserva ? handleUpdateReserva : handleCreateReserva}
            onCancel={closeForm}
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && reservaToDelete && (
          <ConfirmDialog
            title="Confirmar Exclusão"
            message={`Tem certeza que deseja excluir a reserva da sala "${reservaToDelete.sala}" do dia ${formatDateTime(reservaToDelete.data_inicio)}?`}
            onConfirm={handleDeleteReserva}
            onCancel={() => {
              setShowDeleteConfirm(false)
              setReservaToDelete(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default App

