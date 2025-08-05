import { IconCreditCard } from "@tabler/icons-react";

export default function BillingPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and billing information</p>
        </div>
      </div>

      <div className="grid gap-4 place-items-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <IconCreditCard className="h-16 w-16 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Billing Management</h2>
            <p className="text-muted-foreground max-w-md">
              Coming soon! Manage your subscription plans, payment methods, and billing history all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
