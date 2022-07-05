import React from 'react';
import { StyleSheet } from 'react-native';
import { Table, TableWrapper, Col, Cell } from 'react-native-table-component';
import styled from 'styled-components/native';

interface ITableData {
  prevDate: string;
  currDate: String;
  colTitle: string[];
  prevInfo: string[];
  currInfo: string[];
}
interface IProps {
  tableData: ITableData;
}
function TableView({
  tableData: { prevDate, currDate, colTitle, prevInfo, currInfo },
}: IProps) {
  return (
    <TableWrap>
      <Table style={styles.table} borderStyle={styles.tableBorder}>
        <TableWrapper style={styles.tableWrapperTop}>
          <Cell data={'분류'} textStyle={styles.col} />
          <Cell data={prevDate} textStyle={styles.cell} />
          <Cell data={currDate} textStyle={styles.cell} />
        </TableWrapper>
        <TableWrapper style={styles.tableWrapperBottom}>
          <Col
            data={colTitle}
            heightArr={[46, 46, 46]}
            textStyle={styles.col}
          />
          <Col
            data={prevInfo}
            heightArr={[46, 46, 46]}
            textStyle={styles.cell}
          />
          <Col
            data={currInfo}
            heightArr={[46, 46, 46]}
            textStyle={styles.cell}
          />
        </TableWrapper>
      </Table>
    </TableWrap>
  );
}
const styles = StyleSheet.create({
  table: {
    width: '101%',
  },
  col: {
    fontSize: 15,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#CBCCCE',
  },
  tableWrapperTop: {
    flexDirection: 'row',
    height: 46,
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  tableWrapperBottom: {
    flexDirection: 'row',
  },
  cell: {
    paddingLeft: 12,
    fontSize: 15,
  },
});
const TableWrap = styled.View`
  overflow: hidden;
  display: flex;
  align-items: center;
  margin: 30px 20px 20px;
`;
export default TableView;
