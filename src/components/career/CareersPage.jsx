import React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Button, Box
} from '@mui/material'
import { Textfit } from 'react-textfit'

const CareersPage = () => {
  const isAdmin = false

  const careers = [
    { company: '넷컴솔루션', position: '사원', period: '2023.01' }
  ]

  const education = [
    { school: '한국방송통신대학교', major: '컴퓨터과학과', period: '2024.03 ~ 재학중' },
  ]

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 2, sm: 3 } }}>
      {/* 학력 섹션 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: isAdmin ? 'space-between' : 'center',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            fontWeight: 'bold'
          }}
        >
          학력 사항
        </Typography>
        {isAdmin && (
          <Button
            variant="outlined"
            size="small"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' }, py: 0.5 }}
          >
            + 추가
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>학교</TableCell>
              <TableCell>전공</TableCell>
              <TableCell>재학 기간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {education.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell sx={{ whiteSpace: 'nowrap', maxWidth: 180 }}>
                  <Textfit mode="single" min={8} max={14}>
                    {item.school}
                  </Textfit>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', maxWidth: 140 }}>
                  <Textfit mode="single" min={8} max={14}>
                    {item.major}
                  </Textfit>
                </TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', maxWidth: 140 }}>
                  <Textfit mode="single" min={4} max={14}>
                    {item.period}
                  </Textfit>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default CareersPage
