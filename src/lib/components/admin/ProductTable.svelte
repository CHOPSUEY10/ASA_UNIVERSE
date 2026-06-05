<script lang="ts">
    import AdminTable from '../AdminTable.svelte';

    let { products = [], onEdit = () => {}, onDelete = () => {} }: {
        products: any[];
        onEdit: (id: number) => void;
        onDelete: (id: number) => void;
    } = $props();

    const columns: Array<{key: string, label: string, type?: 'boolean' | 'date' | 'currency' | 'action'}> = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'price', label: 'Price', type: 'currency' },
        { key: 'stock', label: 'Stock' },
        { key: 'isActive', label: 'Active', type: 'boolean' },
        { key: 'isFeatured', label: 'Featured', type: 'boolean' },
        { key: 'actions', label: 'Actions', type: 'action' }
    ];
</script>

<AdminTable 
    {columns} 
    data={products} 
    {onEdit} 
    {onDelete} 
/>
