import React from 'react';
import '@testing-library/jest-dom';
import { screen, render, waitFor } from '@testing-library/react';


import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
const { nanoid } = require("nanoid")
const moment = require("moment")

const sampleArticle = {
    id: nanoid(5),
    headline: "Less than half of Seattle homes have air conditioning. After a deadly heat wave, everybody wants it.",
    createdOn: moment().subtract(Math.random() * 10, "days").format(),
    author: "John",
    image: 134,
    summary: "Triple-digit temperatures led to a spike in demand across the region.",
    body: "Inside the attic of a one-story gray house in a Seattle suburb last week, Jeff Bryson gingerly strapped copper piping across the rafters while wearing a white face mask and a headlamp. The temperature was about 110 degrees in the tight space, which was covered in insulation dust. His work was meant to cool the rest of the home."
};

const noAuthorArticle = {
    id: nanoid(5),
    headline: "Less than half of Seattle homes have air conditioning. After a deadly heat wave, everybody wants it.",
    createdOn: moment().subtract(Math.random() * 10, "days").format(),
    author: "",
    image: 134,
    summary: "Triple-digit temperatures led to a spike in demand across the region.",
    body: "Inside the attic of a one-story gray house in a Seattle suburb last week, Jeff Bryson gingerly strapped copper piping across the rafters while wearing a white face mask and a headlamp. The temperature was about 110 degrees in the tight space, which was covered in insulation dust. His work was meant to cool the rest of the home."
};

test('renders component without errors', () => {
    render(<Article article={sampleArticle}/>);
});

test('renders headline, author from the article when passed in through props', () => {
    render(<Article article={sampleArticle} />);

    const articleHeadline = screen.queryByText(/Less than half of Seattle homes have air conditioning. After a deadly heat wave, everybody wants it./i);
    expect(articleHeadline).toBeInTheDocument();

    const articleAuthor = screen.queryByText(/john/i);
    expect(articleAuthor).toBeInTheDocument();

    const articleSummary = screen.queryByText(/Triple-digit temperatures led to a spike in demand across the region./i);
    expect(articleSummary).toBeInTheDocument(); 

    const articleBody = screen.queryByText(/Inside the attic of a one-story gray house in a Seattle suburb last week, Jeff Bryson gingerly strapped copper piping across the rafters while wearing a white face mask and a headlamp. The temperature was about 110 degrees in the tight space, which was covered in insulation dust. His work was meant to cool the rest of the home./i);
    expect(articleBody).toBeInTheDocument(); 
});

test('renders "Associated Press" when no author is given', () => {
    render(<Article article={noAuthorArticle} />);

    const associatedPress = screen.queryByText(/Associated Press/i);
    expect(associatedPress).toBeInTheDocument();
});

test('executes handleDelete when the delete button is pressed', async () => {
    const mockDelete = jest.fn();
    render(<Article article={sampleArticle} handleDelete={mockDelete}/>);

    let articleAuthor = screen.queryByText(/john/i);
    expect(articleAuthor).toBeInTheDocument();
    
    const deleteBtn = screen.queryByTestId('deleteButton');
    userEvent.click(deleteBtn);

    expect(mockDelete).toHaveBeenCalled();
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.