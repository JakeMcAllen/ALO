'use client'

import { Chip, Grid2, Typography, Paper } from "@mui/material"
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

// Nuovo componente per il chip con informazioni
function WordChipWithInfo({ word, onClick, definition, examples, synset }: {
    word: string;
    onClick: (word: string) => void;
    definition: string;
    examples: string[];
    synset: string[];
}) {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const infoBoxRef = useRef<HTMLDivElement>(null); // Riferimento al box informativo
    const chipRef = useRef<HTMLDivElement>(null); // Riferimento al chip
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Riferimento al timer

    // Funzione per chiudere il box
    const closeInfoBox = useCallback(() => {
        setShowInfo(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    // Funzione per resettare il timer di chiusura
    const resetCloseTimer = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            closeInfoBox();
        }, 20000); // 20 secondi
    }, [closeInfoBox]);

    const handleClick = () => {
        if (showInfo) {
            closeInfoBox(); // Chiudi se è già aperto
        } else {
            onClick(word); // Effettua la ricerca solo quando si apre
            setShowInfo(true);
            resetCloseTimer(); // Avvia il timer quando il box è aperto
        }
    };

    // Gestione click esterno
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                infoBoxRef.current && !infoBoxRef.current.contains(event.target as Node) &&
                chipRef.current && !chipRef.current.contains(event.target as Node) &&
                showInfo
            ) {
                closeInfoBox();
            }
        };

        if (showInfo) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showInfo, closeInfoBox]);

    // Gestione mouse enter/leave per il timer di chiusura
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleMouseLeave = () => {
        if (showInfo) {
            resetCloseTimer();
        }
    };

    return (
        <div
            style={{ display: 'inline-block', margin: '0px', position: 'relative' }} // Aggiungi position: 'relative' per il posizionamento assoluto
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div ref={chipRef}> {/* Wrapper per il chip per il riferimento */}
                <Chip
                    variant="outlined"
                    onClick={handleClick}
                    label={word}
                    style={{
                        padding: "0px",
                        borderColor: "#ffff"
                    }}
                />
            </div>
            {showInfo && (
                <Paper
                    ref={infoBoxRef} // Assegna il riferimento
                    elevation={3}
                    sx={{
                        position: 'absolute',
                        zIndex: 1,
                        p: 2,
                        mt: 0.5,
                        minWidth: '200px',
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[50]
                                : theme.palette.grey[700],
                        borderRadius: "8px",
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <Typography variant="subtitle2">
                        Word: {word}
                    </Typography>
                    {definition && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Definition: {definition}
                        </Typography>
                    )}
                    {examples.length > 0 && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Examples: {examples.join(', ')}
                        </Typography>
                    )}
                    {synset.length > 0 && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Synset: {synset.join(', ')}
                        </Typography>
                    )}
                    {!definition && examples.length === 0 && synset.length === 0 && (
                        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                            Nessuna informazione disponibile.
                        </Typography>
                    )}
                </Paper>
            )}
        </div>
    );
}


export default function Textcanvas({
    Title = undefined,
    textToDisp,
}: {
    Title?: string | undefined,
    textToDisp: string
}) {

    const [wordSearched, setWordSearched] = useState<string>("");
    const [definition, setDefinition] = useState<string>("");
    const [Examples, setExamples] = useState<string[]>([]);
    const [Synset, setSynset] = useState<string[]>([]);


    async function handleClick(wordToInspect: string) {
        setWordSearched(wordToInspect);

        const json = JSON.stringify({
            searchWord: wordToInspect
        });

        try {
            const response: any = await axios.post('/api/WordDict', json, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.data?.responde?.Definition?.length) {
                setDefinition(response.data.responde.Definition[0]);
                setExamples(response.data.responde.Example || []);
                setSynset(response.data.responde.Synset || []);
            } else {
                console.error("Definition è undefined o vuoto!");
                setDefinition("");
                setExamples([]);
                setSynset([]);
            }
        } catch (error) {
            console.error("Errore durante la chiamata API:", error);
            setDefinition("");
            setExamples([]);
            setSynset([]);
        }
    }

    return (
        <Grid2
            container
            direction="column"
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 6,
                width: "100%",
                marginTop: "10px",
                borderRadius: "25px",
                padding: "2%"
            }}
        >
            <>
                {Title ?
                    <Typography variant="subtitle2" style={{ margin: "10px 0 30px 0" }}>{Title}</Typography>
                    :
                    null
                }
            </>
            <Grid2
                container
                direction="row"
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                {
                    textToDisp.split(".").map((ttd_splt: string, main_index: number) => (
                        <div key={main_index} style={{ margin: "0 0 10px 0"}}>
                            {
                                ttd_splt.split(" ").map((elm: string, index: number) => (
                                    elm ?
                                        <WordChipWithInfo
                                            key={`${main_index}-${index}`}
                                            word={elm}
                                            onClick={handleClick}
                                            definition={wordSearched === elm ? definition : ""}
                                            examples={wordSearched === elm ? Examples : []}
                                            synset={wordSearched === elm ? Synset : []}
                                        />
                                        :
                                        null
                                ))
                            }
                            .
                            <br />
                        </div>
                    ))
                }
            </Grid2>
            <Grid2
                size={12}
                sx={{
                    backgroundColor: "white",
                    borderRadius: "15px",
                    p: 6,
                    height: "45%",
                    width: "100%",
                    padding: "2%"
                }}
            >
                <Typography>Action box, condividi, copia, ecc..</Typography>
            </Grid2>
        </Grid2>
    )
}

