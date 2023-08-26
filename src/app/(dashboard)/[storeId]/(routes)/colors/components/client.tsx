'use client'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ColorColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ColorClientProps {
  data: ColorColumn[]
}

const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div
        className="flex items-center justify-between"
      >
        <Heading
          title={`Colores (${data.length})`}
          description="Organiza los colores de tus prendas"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Nuevo color
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
      />
      <Heading
        title='API'
        description='Estos son los endpoints para consumir los colores'
      />
      <Separator />
      <ApiList
        entityName="colors"
        entityIdName="colorId"
      />
    </>
  )
}

export default ColorClient