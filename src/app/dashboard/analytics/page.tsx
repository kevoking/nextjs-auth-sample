'use client'

import { useState } from "react"
import {
  IconChartBar,
  IconTrendingUp,
  IconTrendingDown,
  IconUsers,
  IconCreditCard,
  IconCurrencyDollar,
  IconCalendar,
  IconArrowUp,
  IconArrowDown,
  IconEye,
  IconUserPlus,
  IconRepeat,
} from "@tabler/icons-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for analytics
const revenueData = [
  { month: "Jan", revenue: 12400, subscribers: 245, churn: 12 },
  { month: "Feb", revenue: 15600, subscribers: 289, churn: 8 },
  { month: "Mar", revenue: 18200, subscribers: 334, churn: 15 },
  { month: "Apr", revenue: 21800, subscribers: 398, churn: 11 },
  { month: "May", revenue: 24500, subscribers: 445, churn: 9 },
  { month: "Jun", revenue: 27200, subscribers: 498, churn: 14 },
  { month: "Jul", revenue: 29800, subscribers: 542, churn: 10 },
]

const subscriptionPlansData = [
  { name: "Basic", value: 45, color: "#8884d8" },
  { name: "Pro", value: 35, color: "#82ca9d" },
  { name: "Enterprise", value: 20, color: "#ffc658" },
]

const userActivityData = [
  { day: "Mon", activeUsers: 1240, pageViews: 3420 },
  { day: "Tue", activeUsers: 1380, pageViews: 3680 },
  { day: "Wed", activeUsers: 1520, pageViews: 4120 },
  { day: "Thu", activeUsers: 1420, pageViews: 3890 },
  { day: "Fri", activeUsers: 1680, pageViews: 4560 },
  { day: "Sat", activeUsers: 980, pageViews: 2340 },
  { day: "Sun", activeUsers: 890, pageViews: 2120 },
]

const conversionFunnelData = [
  { stage: "Visitors", count: 10000, percentage: 100 },
  { stage: "Sign-ups", count: 2500, percentage: 25 },
  { stage: "Trial Users", count: 1800, percentage: 18 },
  { stage: "Paid Users", count: 542, percentage: 5.42 },
]

type MetricCardProps = {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
}

const MetricCard = ({ title, value, change, changeLabel, icon }: MetricCardProps) => {
  const isPositive = change > 0
  const changeIcon = isPositive ? <IconArrowUp className="h-3 w-3" /> : <IconArrowDown className="h-3 w-3" />
  const changeColor = isPositive ? "text-green-600" : "text-red-600"

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center text-xs ${changeColor}`}>
          {changeIcon}
          <span className="ml-1">
            {Math.abs(change)}% {changeLabel}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const metrics = [
    {
      title: "Monthly Recurring Revenue",
      value: "$29,800",
      change: 12.5,
      changeLabel: "from last month",
      icon: <IconCurrencyDollar className="h-4 w-4" />,
    },
    {
      title: "Active Subscribers",
      value: "542",
      change: 8.9,
      changeLabel: "from last month",
      icon: <IconUsers className="h-4 w-4" />,
    },
    {
      title: "Churn Rate",
      value: "1.8%",
      change: -0.4,
      changeLabel: "from last month",
      icon: <IconTrendingDown className="h-4 w-4" />,
    },
    {
      title: "Average Revenue Per User",
      value: "$54.98",
      change: 3.2,
      changeLabel: "from last month",
      icon: <IconCreditCard className="h-4 w-4" />,
    },
  ]

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor your SaaS performance and key metrics</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Revenue and Growth Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly recurring revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscriber Growth</CardTitle>
            <CardDescription>Active subscribers and churn rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="subscribers" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Subscribers"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="churn" 
                  stroke="#ff7c7c" 
                  strokeWidth={2}
                  name="Churn"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Activity and Plan Distribution */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users</CardTitle>
            <CardDescription>User activity and page views this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="activeUsers" fill="#8884d8" name="Active Users" />
                <Bar dataKey="pageViews" fill="#82ca9d" name="Page Views" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>Distribution of subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionPlansData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subscriptionPlansData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel and Additional Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey from visitor to paid subscriber</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnelData.map((stage, index) => (
                <div key={stage.stage} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium">{stage.stage}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-8 bg-primary rounded"
                        style={{ width: `${stage.percentage}%` }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {stage.count.toLocaleString()} ({stage.percentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Additional key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconEye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Conversion Rate</span>
              </div>
              <Badge variant="secondary">5.42%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconUserPlus className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">New Signups</span>
              </div>
              <Badge variant="secondary">+127</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconRepeat className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Trial Conversions</span>
              </div>
              <Badge variant="secondary">68%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconCalendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Avg. Trial Length</span>
              </div>
              <Badge variant="secondary">12 days</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Growth Rate</span>
              </div>
              <Badge variant="default">+12.5%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
