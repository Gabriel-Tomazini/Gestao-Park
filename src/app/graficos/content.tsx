"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export const GraficoQuantidadePorPeriodo = () => {
  const [dados, setDados] = useState([]);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const theme = useTheme();

  // Busca dados do backend
  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/graficos", {
          params: { startDate, endDate },
        });
        setDados(
          response.data.map((item: { dia: string; quantidade: number }) => ({
            dia: new Date(item.dia).toLocaleDateString(),
            quantidade: item.quantidade,
          }))
        );
      } catch (error) {
        console.error('Erro ao buscar os dados do gráfico:', error);
      }
    };

    fetchDados();
  }, [startDate, endDate]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gráfico do estacionamento rotativo
      </Typography>

      {/* Controles de período */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Data Início"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Data Fim"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log('Gráfico atualizado!')}
          >
            Atualizar Gráfico
          </Button>
        </Grid>
      </Grid>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" stroke={theme.palette.text.primary} />
          <YAxis stroke={theme.palette.text.primary} />
          <Tooltip />
          <Line type="monotone" dataKey="quantidade" stroke={theme.palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

