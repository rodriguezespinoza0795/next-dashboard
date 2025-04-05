import { deleteInvoice } from "@/lib/actions";

import Link from "next/link";
import { Button } from "../ui/button";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";

export function CreateInvoice() {
  return (
    <Button
      asChild
      className="bg-blue-600 text-white hover:bg-blue-500"
      size="lg"
    >
      <Link href="/dashboard/invoices/create">
        <PlusIcon />
        Create Invoice
      </Link>
    </Button>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Button variant="outline" size="icon">
      <Link href={`/dashboard/invoices/${id}/edit`}>
        <PencilIcon />
      </Link>
    </Button>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <Button type="submit" variant="outline" size="icon">
        <TrashIcon />
      </Button>
    </form>
  );
}
