'use client'

import { useEffect, useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Modal
      title='Eliminar tienda'
      description="¿Estas seguro que quieres eliminar esta tienda? Esta acción no se puede deshacer."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div
        className="pt-6 space-x-6 flex items-center justify-end w-full"
      >
        <Button
          variant='outline'
          onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          variant='destructive'
          onClick={onConfirm}
          disabled={loading}
        >
          Eliminar
        </Button>
      </div>
    </Modal>
  )
}