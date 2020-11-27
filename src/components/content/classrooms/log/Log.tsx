import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button, DatePicker, Divider, Input, Space, Table} from "antd";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons/lib";

const log = [{key: 0,
    name: "User Name",
    from: "9:00",
    to: "15:00"}]

const Log = () => {

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
            title: 'Час видачі',
            dataIndex: 'from',
            key: 'from',
            width: '20%',
            ...getColumnSearchProps('from'),
        },
        {
            title: 'Час повернення',
            dataIndex: 'to',
            key: 'to',
            ...getColumnSearchProps('to'),
        },
    ];
    return <>
        <h1>Журнал видачі аудиторій</h1>
        <Divider/>
        <p>Виберіть дату:</p>
        <DatePicker onChange={()=>{}} style={{
        marginBottom: "10px"}
        }/>
        <Table columns={columns} dataSource={log} />;
    </>
}
export default Log;