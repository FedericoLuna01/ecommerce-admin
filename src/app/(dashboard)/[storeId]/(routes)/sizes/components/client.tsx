'use client'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { SizeColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface SizeClientProps {
  data: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div
        className="flex items-center justify-between"
      >
        <Heading
          title={`Talles (${data.length})`}
          description="Organiza los talles de tus prendas"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Nuevo talle
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
        description='Estos son los endpoints para consumir los talles'
      />
      <Separator />
      <ApiList
        entityName="sizes"
        entityIdName="sizeId"
      />
    </>
  )
}

export default SizeClient