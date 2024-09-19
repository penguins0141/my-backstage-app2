import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, TextField, Typography } from '@material-ui/core';

export const AppSecurityTesterPage = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [repoUrl, setRepoUrl] = useState('https://github.com/gh-workflow-course/python-one');

    const handleScan = async () => {
        setLoading(true);
        setResult('');

        try {
            const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
            const apiUrl = process.env.REACT_APP_OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
            const prompt = `Find security flaws in the GitHub repository ${repoUrl}`;

            const response = await axios.post(
                apiUrl,
                {
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: prompt }],
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setResult(response.data.choices[0].message.content);
        } catch (error) {
            setResult(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Typography variant="h4">Plugin Security Review</Typography>
            <Typography variant="body1">
                Enter the GitHub repository URL to check for security flaws using ChatGPT:
            </Typography>

            <TextField
                label="GitHub Repository URL"
                fullWidth
                value={repoUrl}
                onChange={e => setRepoUrl(e.target.value)}
                margin="normal"
            />

            <Button variant="contained" color="primary" onClick={handleScan} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Run Security Review'}
            </Button>

            {result && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h6">Security Analysis Result:</Typography>
                    <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                        {result}
                    </Typography>
                </div>
            )}
        </div>
    );
};
