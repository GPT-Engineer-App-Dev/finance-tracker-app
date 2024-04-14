import React, { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Select, RadioGroup, Radio, Stack, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text, FormHelperText } from "@chakra-ui/react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    date: "",
    amount: "",
    type: "expense",
    category: "",
  });
  const [mode, setMode] = useState("add");
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { date, amount, type, category } = formData;

    const newErrors = {};
    if (!date) {
      newErrors.date = "Date is required";
    }
    if (!amount || isNaN(amount)) {
      newErrors.amount = "Amount must be a valid number";
    }
    if (!category) {
      newErrors.category = "Category is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (mode === "add") {
      const newTransaction = {
        id: Date.now(),
        ...formData,
        amount: Number(amount),
      };

      setTransactions((prevTransactions) => [newTransaction, ...prevTransactions]);
    } else {
      const updatedTransactions = transactions.map((transaction) => (transaction.id === formData.id ? { ...formData, amount: Number(amount) } : transaction));
      setTransactions(updatedTransactions);
    }

    setFormData({
      id: null,
      date: "",
      amount: "",
      type: "expense",
      category: "",
    });
    setMode("add");
    setErrors({});
  };

  const sortedTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        My Budget App
      </Heading>

      <Box as="section" marginBottom={8}>
        <Heading as="h2" size="lg" marginBottom={4}>
          {mode === "add" ? "Add" : "Edit"} Transaction
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input type="date" name="date" value={formData.date} onChange={handleInputChange} />
              {errors.date && <FormHelperText color="red.500">{errors.date}</FormHelperText>}
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleInputChange} />
              {errors.amount && <FormHelperText color="red.500">{errors.amount}</FormHelperText>}
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Type</FormLabel>
              <RadioGroup defaultValue="expense">
                <Stack direction="row">
                  <Radio value="income" name="type" checked={formData.type === "income"} onChange={handleInputChange}>
                    Income
                  </Radio>
                  <Radio value="expense" name="type" checked={formData.type === "expense"} onChange={handleInputChange}>
                    Expense
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select category" name="category" value={formData.category} onChange={handleInputChange}>
                <option>Groceries</option>
                <option>Bills</option>
                <option>Salary</option>
                <option>Entertainment</option>
              </Select>
              {errors.category && <FormHelperText color="red.500">{errors.category}</FormHelperText>}
            </FormControl>
            <Button type="submit" colorScheme="blue">
              {mode === "add" ? "Add" : "Update"} Transaction
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
              {sortedTransactions.map((transaction) => (
                <Tr key={transaction.id}>
                  <Td>{formatDate(transaction.date)}</Td>
                  <Td>
                    <Text color={transaction.type === "income" ? "green.500" : "red.500"}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </Text>
                  </Td>
                  <Td>{transaction.type}</Td>
                  <Td>{transaction.category}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => {
                        setFormData(transaction);
                        setMode("edit");
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this transaction?")) {
                          setTransactions((prevTransactions) => prevTransactions.filter((t) => t.id !== transaction.id));
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Index;
