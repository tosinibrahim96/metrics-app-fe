import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../src/pages/navbar/index';


describe('Navbar component renders properly', () => {
  test('renders heading properly', () => {
    const { getByTestId } = render(<Navbar />, {wrapper:BrowserRouter});
    expect(screen.getByRole('heading', 'Metricsss'));
  });

  test('renders links without errors', () => {
    const { getByTestId } = render(<Navbar />, {wrapper:BrowserRouter});
    const navLinks = screen.getAllByRole('link');

    expect(navLinks[0]).toBeVisible();
    expect(navLinks[0]).toHaveTextContent('Dashboard');

    expect(navLinks[1]).toBeVisible();
    expect(navLinks[1]).toHaveTextContent('Create new Metric');
  });


  test('renders icon without errors', () => {
    const { getByTestId } = render(<Navbar />, {wrapper:BrowserRouter});
    const iconElement = getByTestId('PixIcon');
    
    expect(iconElement).toBeVisible();
    expect(iconElement).toHaveClass('MuiSvgIcon-fontSizeMedium');
  });
});
