import React, {useState} from 'react';
import {Button, Input, Space, Table} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {useSelector} from "react-redux";

const Catalog = () => {
    // @ts-ignore
    let users = useSelector(state=>state.usersReducer.users).map(u=>({
        key: u.id,
        name: u.firstName + " " + u.patronymic + " " + u.lastName,
        department: u.department,
        type: u.type
    }))

    let [searchText, setSearchText] = useState('');
    let [searchedColumn, setSearchedColumn] = useState('');
    let searchInput: any;
    let getColumnSearchProps = (dataIndex:any)=> ({
        // @ts-ignore
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered:any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value:any, record:any) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible:any) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: (text:any) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    // @ts-ignore
    let handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
            setSearchText(selectedKeys[0])
            setSearchedColumn(dataIndex)
    };

    let handleReset = (clearFilters: any) => {
        clearFilters();
        setSearchText('');
    };


        const columns = [
            {
                title: 'Ф.І.О.',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                ...getColumnSearchProps('name'),
            },
            {
                title: 'Тип',
                dataIndex: 'type',
                key: 'type',
                width: '20%',
                ...getColumnSearchProps('type'),
            },
            {
                title: 'Кафедра',
                dataIndex: 'department',
                key: 'department',
                ...getColumnSearchProps('department'),
            },
        ];
    return <>
        <h1>Каталог користувачів</h1>
        <Table columns={columns} dataSource={users} />;

    </>
}
export default Catalog;