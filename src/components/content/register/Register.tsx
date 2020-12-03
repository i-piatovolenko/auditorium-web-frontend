import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, DatePicker, Divider, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons/lib";
import { client } from "../../../api/client";
import { fetchRegistersTC } from "../../../store/effects";

const Log = () => {
  let [searchText, setSearchText] = useState("");
  let [searchedColumn, setSearchedColumn] = useState("");
  let searchInput: any;
  const dispatch = useDispatch();
  useEffect(() => {
    client.cache.reset().then((r: any) => {
      dispatch(fetchRegistersTC());
    });
  });
  // @ts-ignore
  let register = useSelector((state) => state.registerReducer.register).map(
    (el:any) => ({
      key: el.id,
      name: el.user.lastName,
      classroom: el.classroom.name,
      from:
        new Date(el.start).getHours() +
        ":" +
        (new Date(el.start).getMinutes() < 10 ? "0" : "") +
        new Date(el.start).getMinutes(),
      to:
        el.end === null
          ? ""
          : new Date(el.end).getHours() +
            ":" +
            (new Date(el.end).getMinutes() < 10 ? "0" : "") +
            new Date(el.end).getMinutes(),
    })
  );
  let getColumnSearchProps = (dataIndex: any) => ({
    // @ts-ignore
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // @ts-ignore
  let handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  let handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Аудиторія",
      dataIndex: "classroom",
      key: "classroom",
      width: "10%",
    },
    {
      title: "П.І.Б.",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Час видачі",
      dataIndex: "from",
      key: "from",
      width: "20%",
    },
    {
      title: "Час повернення",
      dataIndex: "to",
      key: "to",
    },
  ];
  return (
    <>
      <h1>Журнал видачі аудиторій</h1>
      <Divider />
      <p>Виберіть дату:</p>
      <DatePicker
        onChange={() => {}}
        style={{
          marginBottom: "10px",
        }}
      />
      <Table columns={columns} dataSource={register} />
    </>
  );
};
export default Log;
