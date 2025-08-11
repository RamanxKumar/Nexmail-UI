import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://13.202.248.2:8897/api/email/generate", {
        emailContent,
        tone,
      });

      setReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      console.error("Error generating reply:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmailContent("");
    setTone("");
    setReply("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6D5BBA 0%, #8D58BF 50%, #DE67A3 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(6px)",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", textAlign: "center", color: "#6D5BBA" }}
          >
            Nexmail
          </Typography>

          {/* Email Content */}
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Tone Selection */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Tone</InputLabel>
            <Select
              value={tone}
              label="Tone"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Casual">Casual</MenuItem>
              <MenuItem value="Friendly">Friendly</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
            </Select>
          </FormControl>

          {/* Buttons Row */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              sx={{
                flex: 1,
                borderRadius: 3,
                background: "linear-gradient(90deg, #6D5BBA, #DE67A3)",
                "&:hover": {
                  background: "linear-gradient(90deg, #5A48A0, #C7588D)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Generate Reply"}
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={handleClear}
              sx={{ flex: 1, borderRadius: 3 }}
            >
              Clear
            </Button>
          </Box>

          {/* Reply Output */}
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Reply By Nexmail"
            value={reply}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mb: 2 }}
          />

          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderRadius: 3,
            }}
            onClick={() => navigator.clipboard.writeText(reply)}
          >
            Copy Reply
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
