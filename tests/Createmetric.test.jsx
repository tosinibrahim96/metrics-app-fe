import React, { useState as useStateMock } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateMetric from '../src/pages/create-metric';
import {vi} from 'vitest';


describe('CreateMetric component renders properly', () => {
    test('renders page header properly', () => {
        const { getByTestId } = render(<CreateMetric />, { wrapper: BrowserRouter });

        const pageHeader = screen.getByRole('heading');
        expect(pageHeader).toHaveTextContent('Create new metric');

        const createMetricForm = screen.getByRole('create-metric-form');
        expect(createMetricForm).toBeVisible();

        const nameField = screen.getByLabelText("Name *", { selector: "input" });
        expect(nameField).toBeVisible();

        const valueField = screen.getByLabelText("Value *", { selector: "input" });
        expect(valueField).toBeVisible();

        const dateField = screen.getByLabelText("Date *", { selector: "input" });
        expect(dateField).toBeVisible();

        const submitButton = screen.getByRole('button', { name: /Create metric/i });
        expect(submitButton).toBeVisible();
    });
});




describe('Users can interract with the text input fields', () => {
    test('Input values should change during interraction', () => {
        const { getByTestId } = render(<CreateMetric />, { wrapper: BrowserRouter });

        const nameField = screen.getByLabelText("Name *", { selector: "input" });
        fireEvent.change(nameField, { target: { value: 'Sales' } });
        expect(nameField.value).toBe('Sales');

        const valueField = screen.getByLabelText("Value *", { selector: "input" });
        fireEvent.change(valueField, { target: { value: 1500 } });
        expect(valueField.value).toBe('1500');

        const dateField = screen.getByLabelText("Date *", { selector: "input" });
        fireEvent.change(dateField, { target: { value: '2023-04-27 00:00' } });
        expect(dateField.value).toBe('2023-04-27T00:00');
    });
});


global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
        "status": true,
        "message": "New metric added successfully",
        "data": {
          "name": "Sales",
          "value": 1200,
          "date": "2023-04-26 00:00:00",
          "updated_at": "2023-04-29T17:19:04.000000Z",
          "created_at": "2023-04-29T17:19:04.000000Z",
          "id": 64
        }
      }),
  })
);

describe('Submit button scenarios', () => {
    test('Does not send a request to save data if the name input was not changed before submission', async () => {
        const { getByTestId } = render(<CreateMetric />, { wrapper: BrowserRouter });

        const submitButton = screen.getByRole('button', { name: /Create metric/i });
        fireEvent.click(submitButton);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(0))
       
    });


    test('Sends an HTTP request if the name input was changed before submission', async () => {
        const { getByTestId } = render(<CreateMetric />, { wrapper: BrowserRouter });

        const nameField = screen.getByLabelText("Name *", { selector: "input" });
        const valueField = screen.getByLabelText("Value *", { selector: "input" });
        const submitButton = screen.getByRole('button', { name: /Create metric/i });


        fireEvent.change(nameField, { target: { value: 'Sales' } });
        fireEvent.change(valueField, { target: { value: 1500 } }); 
        fireEvent.click(submitButton);

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))       
    });
});
