import {Box, Button, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import Header from "../../../components/Header";
import {useRef, useState} from "react";
import axios from "axios";

const Photo = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const inputRef = useRef(null);
    const [drag, setDrag] = useState(false);

    const handleButtonClick = () => {
        const files = inputRef.current.click();
        uploadFilesToServer(files);
    };

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true);
    }

    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false);
    }

    function onDropHandler(e) {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        uploadFilesToServer(files)
        setDrag(false)
    }

    const uploadFilesToServer = async (files)=>{
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }

            await axios.post('http://localhost:8080/api/v1/compressed/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Файлы успешно отправлены на сервер.');
        } catch (error) {
            console.error('Ошибка при отправке файлов на сервер:', error);
        }
    };

    return (
        <Box m="20px">
            <Header title="Сжать фото"/>
            {drag
                ? <Box
                    sx={{
                        width: "auto",
                        height: "80vh",
                        border: `5px dashed ${colors.grey[500]}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >
                    <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        onDragStart={e => e.preventDefault()}
                        onDragLeave={e => e.preventDefault()}
                        onDragOver={e => e.preventDefault()}
                    >Отпустите файлы для загрузки</Typography>
                </Box>
                : <Box
                    sx={{
                        width: "auto",
                        height: "80vh",
                        border: `5px dashed ${colors.grey[500]}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                >
                    <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        onDragStart={e => e.preventDefault()}
                        onDragLeave={e => e.preventDefault()}
                        onDragOver={e => e.preventDefault()}
                    >Перетащите файлы для загрузки
                    </Typography>

                    <Typography
                        variant="h2"
                        color={colors.grey[100]}
                        fontWeight="inherit"
                        onDragStart={e => e.preventDefault()}
                        onDragLeave={e => e.preventDefault()}
                        onDragOver={e => e.preventDefault()}
                    >или
                    </Typography>
                    <Box my={2}>
                        <input
                            type="file"
                            style={{display: "none"}}
                            ref={inputRef}
                        />
                        <Button
                            style={{backgroundColor: colors.greenAccent[500]}}
                            onClick={handleButtonClick}
                        >Выберите файл</Button>
                    </Box>
                </Box>}
        </Box>
    )
}
export default Photo;