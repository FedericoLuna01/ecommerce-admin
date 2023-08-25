'use client'

import * as z from 'zod'
import { Trash } from "lucide-react";
import { Billboard } from "@prisma/client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/image-upload';

const formSchema = z.object({
  label: z.string().min(1, 'El nombre es requerido'),
  imageUrl: z.string().min(1, 'El imagen es requerida'),
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Billboard | null
}

const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const title = initialData ? 'Editar billboard' : 'Nuevo billboard'
  const description = initialData ? 'Editar billboard' : 'Crea un nuevo billboard'
  const toastMessage = initialData ? 'Billboard editado correctamente' : 'Billboard creado correctamente'
  const action = initialData ? 'Guardar cambios' : 'Crear'

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: ''
    }
  })

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error('Algo salío mal')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      router.refresh()
      router.push('/')
      toast.success('Billboard eliminado')
    } catch (error) {
      toast.error('Asegurate de haber eliminado todas las categorias que esten usando este billboard')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {
          initialData && (
            <Button
              disabled={loading}
              variant='destructive'
              size='icon'
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )
        }
      </div>
      <Separator />
      <Form
        {...form}
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                    Imagen de fondo
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className='grid grid-cols-3 gap-8'
          >
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Label
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Billboard label'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className='ml-auto'
            type='submit'
          >
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}

export default BillboardForm;