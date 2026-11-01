import ItemActions from './ItemActions';

/** ItemActions مع أزرار الترتيب لجداول sort_order */
export default function SortableActions({ table, editor, row, index, total }) {
  return (
    <ItemActions
      item={row}
      onEdit={editor.openEdit}
      onToggle={table.toggle}
      onDelete={table.remove}
      onMove={table.move}
      isFirst={index === 0}
      isLast={index === total - 1}
    />
  );
}
