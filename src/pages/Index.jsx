import React from "react";
import { Box, Heading, FormControl, FormLabel, Input, Select, RadioGroup, Radio, Stack, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";

const Index = () => {
  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        My Budget App
      </Heading>

      <Box as="section" marginBottom={8}>
        <Heading as="h2" size="lg" marginBottom={4}>
          Add Transaction
        </Heading>
        <form>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input type="number" step="0.01" />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Type</FormLabel>
              <RadioGroup defaultValue="expense">
                <Stack direction="row">
                  <Radio value="income">Income</Radio>
                  <Radio value="expense">Expense</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select category">
                <option>Groceries</option>
                <option>Bills</option>
                <option>Salary</option>
                <option>Entertainment</option>
              </Select>
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Add Transaction
            </Button>
          </Stack>
        </form>
      </Box>

      <Box as="section">
        <Heading as="h2" size="lg" marginBottom={4}>
          Transactions
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Amount</Th>
                <Th>Type</Th>
                <Th>Category</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>2023-06-01</Td>
                <Td>$50.00</Td>
                <Td>Expense</Td>
                <Td>Groceries</Td>
              </Tr>
              <Tr>
                <Td>2023-06-02</Td>
                <Td>$1500.00</Td>
                <Td>Income</Td>
                <Td>Salary</Td>
              </Tr>
              <Tr>
                <Td>2023-06-03</Td>
                <Td>$80.00</Td>
                <Td>Expense</Td>
                <Td>Bills</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Index;
