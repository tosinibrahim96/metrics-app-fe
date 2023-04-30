import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../src/pages/dashboard';
import { vi } from 'vitest';



vi.mock('react-chartjs-2', () => ({
    Line: () => null
}));

global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            "status": true
        }),
    })
);


describe('Dashboard renders properly', () => {
    test('renders page header properly', async () => {

        await waitFor(() => {
            const { getByTestId } = render(<Dashboard />);

            const pageHeader = screen.getByRole('heading');
            expect(pageHeader).toHaveTextContent('Dashboard');

            const startDateField = screen.getByLabelText("Start Date *", { selector: "input" });
            expect(startDateField).toBeVisible();

            const endDateField = screen.getByLabelText("End Date *", { selector: "input" });
            expect(endDateField).toBeVisible();

            const dropDowns = screen.getAllByRole("button", { selector: "div" });

            expect(dropDowns[0]).toBeVisible();
            expect(dropDowns[0]).toHaveClass('MuiSelect-select');
            expect(dropDowns[0]).toHaveTextContent('All');

            expect(dropDowns[1]).toBeVisible();
            expect(dropDowns[1]).toHaveClass('MuiSelect-select');
            expect(dropDowns[1]).toHaveTextContent('Hour');

            expect(dropDowns[2]).toBeVisible();
            expect(dropDowns[2]).toHaveClass('MuiButtonBase-root');
            expect(dropDowns[2]).toHaveTextContent('Get Data');
        })

    });
});


describe('Users can interract with all fields', () => {
    test('Input values should change during interraction', async () => {

        await waitFor(() => {
            const { getByTestId } = render(<Dashboard />);

            const startDateField = screen.getByLabelText("Start Date *", { selector: "input" });
            fireEvent.change(startDateField, { target: { value: '2023-04-27 00:00' } });
            expect(startDateField.value).toBe('2023-04-27T00:00');

            const endDateField = screen.getByLabelText("End Date *", { selector: "input" });
            fireEvent.change(endDateField, { target: { value: '2023-04-28 00:00' } });
            expect(endDateField.value).toBe('2023-04-28T00:00');
        })



    });
});


describe('Send request to plot graph', () => {
    test('Send API request when Get Data button is clicked', async () => {
        const { getByTestId } = render(<Dashboard />);

        const buttons = screen.getAllByRole("button", { selector: "div" });

        expect(buttons[2]).toBeVisible();
        expect(buttons[2]).toHaveClass('MuiButtonBase-root');
        expect(buttons[2]).toHaveTextContent('Get Data');

        await waitFor(() => expect(fetch).toHaveBeenCalled())
    });
});
