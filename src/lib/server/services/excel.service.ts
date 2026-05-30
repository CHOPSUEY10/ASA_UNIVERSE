import ExcelJS from 'exceljs';

export const ExcelService = {
    async generateProductsExcel(products: any[]) {
        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'ASA Universe Admin';
        workbook.created = new Date();

        const sheet = workbook.addWorksheet('Products');

        // Setup Columns
        sheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Category (Kain)', key: 'category', width: 20 },
            { header: 'Price', key: 'price', width: 15 },
            { header: 'Stock', key: 'stock', width: 10 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Created Date', key: 'createdAt', width: 25 },
        ];

        // Styling the header row
        sheet.getRow(1).font = { bold: true };
        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };

        // Add rows
        products.forEach(product => {
            sheet.addRow({
                id: product.id,
                name: product.name,
                category: product.kain?.nama || 'Uncategorized',
                price: product.price,
                stock: product.stock,
                status: product.isActive ? 'Active' : 'Inactive',
                createdAt: new Date(product.createdAt).toLocaleString('id-ID')
            });
        });

        // Format price column as currency
        sheet.getColumn('price').numFmt = 'Rp #,##0';

        // Write to buffer
        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }
};
