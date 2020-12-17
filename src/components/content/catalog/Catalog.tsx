import React, { useState } from "react";
import { Button, Card, Input, Radio, Select, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { AuditoriumStateType } from "../../../store/store";
import { setShowUsersPopup } from "../../../store/actions";
import UserPopup from "../userPopup/UserPopup";
import { NavLink, useParams } from "react-router-dom";
import { userTypesUA } from "../../../lib/constants";
import { FilterOutlined } from "@ant-design/icons/lib";

interface ParamTypes {
  userId: string | undefined;
}

const Catalog = () => {
  const { Option } = Select;
  const { userId } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  let users = useSelector(
    (state: AuditoriumStateType) => state.usersReducer.users
  ).map((u) => ({
    ...u,
    name: u.firstName + " " + u.patronymic + " " + u.lastName,
    type: userTypesUA[u.type],
  }));
  const isShownPopupUser = useSelector(
    (state: AuditoriumStateType) => state.auditoriumReducer.showUserPopup
  );
  let [searchText, setSearchText] = useState("");
  let [searchedColumn, setSearchedColumn] = useState("");
  let searchInput: any;
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
  let getColumnSelectProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      confirm,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Radio.Group ref={(node) => {
          searchInput = node;
        }} defaultValue="" onChange={(e)=> {
          setSelectedKeys(e.target.value ? [e.target.value] : [])
          handleSearch(e.target.value, confirm, dataIndex)
        }}>
          <Radio style={radioStyle} value="">
            Всі
          </Radio>
          <Radio style={radioStyle} value="Студент">
            Студент
          </Radio>
          <Radio style={radioStyle} value="Педагог">
            Педагог
          </Radio>
        </Radio.Group>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#fff", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  let getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
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
      title: "П.І.Б.",
      dataIndex: "name",
      key: "name",
      id: "id",
      width: "30%",
      ...getColumnSearchProps("name"),
      render: (name: string, record: any, index: any) => (
        <NavLink
          to={`/catalog/${record.id}`}
          onClick={(e) => {
            dispatch(setShowUsersPopup(true));
            document.body.style.overflowY = "hidden";
          }}
        >
          {name}
        </NavLink>
      ),
    },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
      width: "20%",
      ...getColumnSelectProps("type"),
    },
    {
      title: "Кафедра",
      dataIndex: "department",
      key: "department",
      ...getColumnSearchProps("department"),
    },
  ];
  return (
    <>
      <Card
        title="Каталог користувачів"
        bordered={false}
        style={{ width: "100%" }}
      >
        <Table columns={columns} dataSource={users} />
        {isShownPopupUser ? (
          <UserPopup
            visible={isShownPopupUser}
            user={users.find((u: any) => u.id === userId)}
          />
        ) : null}
      </Card>
    </>
  );
};
export default Catalog;
