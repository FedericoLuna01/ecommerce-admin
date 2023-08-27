'use client'

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { OrderColumn, columns } from "./columns"

interface OrdersClientProps {
  data: OrderColumn[]
}

const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {

  return (
    <>
      <Heading
        title={`Ordenes (${data.length})`}
        description="Estas son las ordenes de tu tienda"
      />
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="products"
      />
    </>
  )
}

export default OrdersClient