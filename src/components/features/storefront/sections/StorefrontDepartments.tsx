import { Button } from "../../../ui/Button";
import { Select } from "../../../ui/Select";
import type { StorefrontDepartmentsProps } from "../types";

export const StorefrontDepartments = ({
  departmentFilters,
  departmentsPageContent,
  departmentSortOptions,
}: StorefrontDepartmentsProps) => {
  return (
    <main className="mx-auto grid w-[min(1200px,100%)] gap-4 px-4 py-6 lg:grid-cols-[280px,1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-700">Filtreler</h2>
        <div className="space-y-2">
          {departmentFilters.map((filter) => (
            <Button key={filter.id} variant="secondary" size="sm" fullWidth className="justify-start">
              {filter.label}
            </Button>
          ))}
        </div>
      </aside>
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-slate-800">{departmentsPageContent.title}</h1>
          <Select
            fullWidth={false}
            className="text-slate-700"
            options={departmentSortOptions.map((option) => ({
              value: option.id,
              label: option.label,
            }))}
          />
        </div>
        <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          {departmentsPageContent.placeholderText}
        </p>
      </section>
    </main>
  );
};
