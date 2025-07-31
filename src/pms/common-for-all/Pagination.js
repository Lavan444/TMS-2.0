import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { useState } from 'react';

const Pagination = ({ data }) => {
  const [pageState, setPageState] = useState({ first: 0, rows: 10 }); // Manage pagination state
  const totalRecords = data.length;

  // Handle pagination
  const onPageChange = (e) => {
    setPageState({ first: e.first, rows: e.rows });
  };

  // Paginated rows
  const paginatedData = data.slice(
    pageState.first,
    pageState.first + pageState.rows
  );

  return (
    <div>
      <DataTable
        value={paginatedData}
        tableStyle={{
          minWidth: '50rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
        dataKey="candidate_id"
        emptyMessage="No customers found."
        resizableColumns
        columnResizeMode="expand"
        editMode="cell"
      >
        <Column
          field="first_name"
          sortable
          header="First Name"
          style={{ minWidth: '12rem' }}
        />
        <Column
          field="last_name"
          sortable
          header="Last Name"
          style={{ minWidth: '12rem' }}
        />
        {/* Add other columns as needed */}
      </DataTable>

      {/* Custom Paginator in the footer */}
      <div className="custom-paginator">
        <Paginator
          first={pageState.first}
          rows={pageState.rows}
          totalRecords={totalRecords}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageChange={onPageChange}
          template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        />
      </div>
    </div>
  );
};

export default Pagination;
