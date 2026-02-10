import Header from "../components/layout/Header";

export default function CategoriesPage() {
  // TODO: Fetch categories from /api/categories
  // TODO: Fetch uncategorized apps

  return (
    <div>
      <Header
        title="Categories"
        subtitle="Organize applications into custom groups"
        actions={
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700">
            New Category
          </button>
        }
      />

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* TODO: Category cards with name, color, app count, usage time */}
      </div>

      {/* Uncategorized apps */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Uncategorized Applications</h2>
        {/* TODO: List of uncategorized apps with drag-and-drop or assign buttons */}
      </div>
    </div>
  );
}
