import { IEventData } from "@/types/IEventData.interface";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { PropsWithChildren } from "react";

interface EventsTableProps {
  items: IEventData[];
}

const EventsTable: React.FC<PropsWithChildren<EventsTableProps>> = ({
  items,
}) => {
  return (
    <div className={"table"}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell align="right">Token Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.tokenId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.from}
                </TableCell>
                <TableCell align="right">{item.tokenId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EventsTable;
