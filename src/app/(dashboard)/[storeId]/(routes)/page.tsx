import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";

const DashboardPage = () => {
  const data = [
    {
      name: 'Enero', total: 34532
    },
    {
      name: 'Febrero', total: 8768
    },
    {
      name: 'Marzo', total: 45646
    },
    {
      name: 'Abril', total: 3453
    },
    {
      name: 'Mayo', total: 64578
    },
    {
      name: 'Junio', total: 6782
    },
    {
      name: 'Julio', total: 23423
    },
    {
      name: 'Agosto', total: 42342
    },
    {
      name: 'Septiembre', total: 78979
    },
    {
      name: 'Octubre', total: 12397
    },
    {
      name: 'Noviembre', total: 3567
    },
    {
      name: 'Diciembre', total: 8356
    },

  ]
  return (
    <div
      className="flex-col"
    >
      <div
        className="flex-1 space-y-4 p-8 pt-6"
      >
        <Heading
          title='Dashboard'
          description="Bienvenido a tu dashboard"
        />
        <Separator />
        <div
          className="grid gap-4 grid-cols-3"
        >
          <Card>
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <CardTitle
                className='text-sm font-medium'
              >
                Total de ventas
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl font-bold"
              >
                {formatter.format(3453)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <CardTitle
                className='text-sm font-medium'
              >
                Ventas
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl font-bold"
              >
                +40
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <CardTitle
                className='text-sm font-medium'
              >
                Productos en Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl font-bold"
              >
                +534
              </div>
            </CardContent>
          </Card>
          <Card
            className="col-span-4"
          >
            <CardHeader>
              <CardTitle>
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent
              className="pl-2"
            >
              <Overview
                data={data}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;