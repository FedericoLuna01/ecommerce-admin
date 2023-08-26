'use client'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps {
  data: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div
        className="flex items-center justify-between"
      >
        <Heading
          title={`Categorías (${data.length})`}
          description="Organiza las categorías de tu tienda"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Nueva categoría
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
        description='Estos son los endpoints para consumir tus categorías'
      />
      <Separator />
      <ApiList
        entityName="categories"
        entityIdName="billboardId"
      />
    </>
  )
}

export default CategoryClient