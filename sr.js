import React, { useState, useEffect } from 'react';
import { z } from 'zod';

const schema = z.array(z.object({
    file: z.instanceof(File),
}));

function MultipleFileUpload() {
    const [files, setFiles] = useState([]);
    const [fileTypes, setFileTypes] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        // Simulando uma chamada à API para obter os tipos de arquivos permitidos
        // Substitua este trecho pelo código real para obter os tipos de arquivos da sua API
        const fetchFileTypes = async () => {
            // Exemplo de tipos de arquivos obtidos da API
            const typesFromApi = ['image/jpeg', 'image/png', 'application/pdf'];
            setFileTypes(typesFromApi);
        };

        fetchFileTypes();
    }, []);

    const handleFileChange = (event, index) => {
        const newFiles = [...files];
        newFiles[index] = event.target.files[0];
        setFiles(newFiles);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const validatedFiles = schema.parse(files);
            setErrors(null);
            // Aqui você pode enviar os arquivos para o servidor
            console.log(validatedFiles);
        } catch (error) {
            setErrors(error.errors);
        }
    };

    return (
        <div>
            <h1>Upload de Múltiplos Arquivos</h1>
            <form onSubmit={handleSubmit}>
                {fileTypes.map((type, index) => (
                    <div key={index}>
                        <input
                            type="file"
                            onChange={(event) => handleFileChange(event, index)}
                            accept={type}
                        />
                    </div>
                ))}
                {errors && (
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error.message}</li>
                        ))}
                    </ul>
                )}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default MultipleFileUpload;
