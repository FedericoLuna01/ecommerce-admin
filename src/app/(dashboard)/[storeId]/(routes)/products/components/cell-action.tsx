'use client'

import { useState } from "react"
import axios from "axios"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"

import { ProductColumn } from "./columns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionProps {
  data: ProductColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const params = useParams()

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('ID copiado al portapapeles')
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/products/${data.id}`)
      router.refresh()
      toast.success('Producto eliminado')
    } catch (error) {
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild >
          <Button
            variant='ghost'
            className="h-8 w-8 p-0"
          >
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
        >
          <DropdownMenuLabel>
            Accciones
          </DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
