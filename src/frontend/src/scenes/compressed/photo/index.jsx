import {Box, Button, Paper, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import Header from "../../../components/Header";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {NotificationManager} from "react-notifications";

const Photo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);
            try {
                const response = await axios.post('http://localhost:8080/compressed/photo', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setUploadedImage(response.data);
                setSelectedFile(null);

            } catch (error) {
                if (error.response.status === 400) {
                    NotificationManager.error("Файл не является фотографией", "Ошибка");
                    setSelectedFile(null)
                }
            }
        }
    };

    return (
        <Box m="20px">
            <Header title="Сжать фото"/>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"

            >
                <Paper
                    elevation={3}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{ padding: '20px', textAlign: 'center', cursor: 'pointer' }}
                >
                    {selectedFile ? (
                        <div>
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Selected"
                                style={{ maxWidth: '100%', marginBottom: '10px' }}
                            />
                            <Typography variant="subtitle1">{selectedFile.name}</Typography>
                            <Button variant="contained" onClick={handleUpload}>
                                Сжать
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <CloudUploadIcon fontSize="large" />
                            <Typography variant="subtitle1">Перетащите файл для загрузки или</Typography>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="file-input"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-input">
                                <Button variant="contained" component="span">
                                    Выберите файл
                                </Button>
                            </label>
                        </div>
                    )}
                </Paper>
                {uploadedImage && (
                    <Box marginTop="20px">
                        <Typography variant="subtitle1">Ваше сжатое изображение:</Typography>
                        <img src={`http://localhost:8080${uploadedImage}`} alt="Compressed" style={{ maxWidth: '100%', marginTop: '10px' }} />
                    </Box>
                )}
            </Box>
        </Box>

    );
};
export default Photo;