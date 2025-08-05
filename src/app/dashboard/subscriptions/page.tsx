'use client'

import { useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table"
import {
  IconUser,
  IconCurrencyDollar,
  IconCheck,
  IconX,
  IconClock,
  IconSearch,
  IconPlus,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Subscription = {
  id: string
  customerName: string
  customerEmail: string
  plan: string
  status: 'active' | 'cancelled' | 'past_due' | 'trial'
  amount: number
  currency: string
  billingCycle: 'monthly' | 'yearly'
  nextBilling: string
  createdAt: string
}

// Mock data for subscriptions
const mockSubscriptions: Subscription[] = [
  {
    id: "sub_1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    plan: "Pro Plan",
    status: "active",
    amount: 29.99,
    currency: "USD",
    billingCycle: "monthly",
    nextBilling: "2025-08-30",
    createdAt: "2025-01-15",
  },
  {
    id: "sub_2",
    customerName: "Jane Smith",
    customerEmail: "jane@company.com",
    plan: "Enterprise",
    status: "active",
    amount: 99.99,
    currency: "USD",
    billingCycle: "monthly",
    nextBilling: "2025-08-28",
    createdAt: "2024-12-01",
  },
  {
    id: "sub_3",
    customerName: "Bob Johnson",
    customerEmail: "bob@startup.io",
    plan: "Basic Plan",
    status: "trial",
    amount: 9.99,
    currency: "USD",
    billingCycle: "monthly",
    nextBilling: "2025-08-05",
    createdAt: "2025-07-20",
  },
  {
    id: "sub_4",
    customerName: "Alice Wilson",
    customerEmail: "alice@tech.com",
    plan: "Pro Plan",
    status: "past_due",
    amount: 29.99,
    currency: "USD",
    billingCycle: "monthly",
    nextBilling: "2025-07-25",
    createdAt: "2024-11-10",
  },
  {
    id: "sub_5",
    customerName: "Charlie Brown",
    customerEmail: "charlie@design.co",
    plan: "Enterprise",
    status: "cancelled",
    amount: 99.99,
    currency: "USD",
    billingCycle: "yearly",
    nextBilling: "2025-12-01",
    createdAt: "2024-01-01",
  },
]

const StatusBadge = ({ status }: { status: Subscription['status'] }) => {
  const variants: Record<Subscription['status'], { variant: "default" | "secondary" | "destructive" | "outline" | null | undefined; icon: React.ReactNode }> = {
    active: { variant: "default", icon: <IconCheck className="w-3 h-3" /> },
    trial: { variant: "secondary", icon: <IconClock className="w-3 h-3" /> },
    past_due: { variant: "destructive", icon: <IconX className="w-3 h-3" /> },
    cancelled: { variant: "outline", icon: <IconX className="w-3 h-3" /> },
  }

  const { variant, icon } = variants[status]

  return (
    <Badge variant={variant} className="flex items-center gap-1">
      {icon}
      {status.replace('_', ' ')}
    </Badge>
  )
}

const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
      const subscription = row.original
      return (
        <div className="flex flex-col">
          <span className="font-medium">{subscription.customerName}</span>
          <span className="text-sm text-muted-foreground">{subscription.customerEmail}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ getValue }) => (
      <span className="font-medium">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <StatusBadge status={getValue() as Subscription['status']} />
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const subscription = row.original
      return (
        <div className="flex flex-col">
          <span className="font-medium">
            {subscription.currency} ${subscription.amount}
          </span>
          <span className="text-sm text-muted-foreground">
            {subscription.billingCycle}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "nextBilling",
    header: "Next Billing",
    cell: ({ getValue }) => (
      <span className="text-sm">
        {new Date(getValue() as string).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ getValue }) => (
      <span className="text-sm text-muted-foreground">
        {new Date(getValue() as string).toLocaleDateString()}
      </span>
    ),
  },
]

export default function SubscriptionsPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data: mockSubscriptions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  const stats = {
    total: mockSubscriptions.length,
    active: mockSubscriptions.filter(s => s.status === 'active').length,
    trial: mockSubscriptions.filter(s => s.status === 'trial').length,
    revenue: mockSubscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + s.amount, 0),
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">Manage your customer subscriptions and billing</p>
        </div>
        <Button>
          <IconPlus className="h-4 w-4 mr-2" />
          Add Subscription
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
            <IconUser className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <IconCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trial</CardTitle>
            <IconClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.trial}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <IconCurrencyDollar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Subscriptions</CardTitle>
          <CardDescription>
            A list of all customer subscriptions and their current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subscriptions..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(String(event.target.value))}
                className="pl-8"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
