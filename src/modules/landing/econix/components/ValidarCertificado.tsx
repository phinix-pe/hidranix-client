import React, { useEffect, useState } from "react";
import logoEconix from "../../../../assets/Logo_Econix.png";

interface CertificadoData {
    name: string;
    dni: string;
    course: string;
    code: string;
    downloadUrl: string;
}

export default function ValidarCertificado() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<CertificadoData | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const certCode = params.get("cert");

        if (!certCode) {
            setError("No se recibió un código de certificado.");
            setLoading(false);
            return;
        }

        fetch(`https://phinix.com.pe/api/validar_certificado.php?cert=${certCode}`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    setData(json.data);
                } else {
                    setError(json.message || "Certificado no válido.");
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Error al conectar con el servidor.");
                setLoading(false);
            });
    }, []);

    if (loading)
        return <div style={styles.loading}>Validando certificado...</div>;

    if (error)
        return (
            <div style={styles.errorBox}>
                <h2>❌ Certificado inválido</h2>
                <p>{error}</p>
            </div>
        );

    return (
        <div style={styles.card}>
            <img
                src={logoEconix}
                alt="Econix Logo"
                style={styles.banner}
            />

            <h1 style={styles.title}>✔ Certificado Válido</h1>

            <div style={styles.infoLine}>
                <strong>Nombre:</strong> <span>{data?.name}</span>
            </div>

            <div style={styles.infoLine}>
                <strong>DNI:</strong> <span>{data?.dni}</span>
            </div>

            <div style={styles.infoLine}>
                <strong>Curso:</strong> <span>{data?.course}</span>
            </div>

            <div style={styles.infoLine}>
                <strong>Código:</strong> <span>{data?.code}</span>
            </div>

            <a
                href={data?.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.button}
            >
                Descargar Certificado PDF
            </a>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    card: {
        margin: "40px auto",
        width: "90%",
        maxWidth: "600px",
        padding: "0 0 30px 0",
        borderRadius: "12px",
        backgroundColor: "#f6faf8",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        fontFamily: "Arial",
    },
    banner: {
        width: "100%",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        marginBottom: "20px",
    },
    title: {
        textAlign: "center",
        marginBottom: "25px",
        color: "#1b5e20",
    },
    infoLine: {
        fontSize: "18px",
        marginBottom: "12px",
        paddingLeft: "30px",
        paddingRight: "30px",
    },
    button: {
        display: "block",
        margin: "25px auto 0 auto",
        padding: "12px",
        width: "80%",
        backgroundColor: "#2e7d32",
        color: "white",
        borderRadius: "10px",
        textAlign: "center",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
    },
    loading: {
        textAlign: "center",
        marginTop: "40px",
        fontSize: "20px",
    },
    errorBox: {
        margin: "40px auto",
        width: "90%",
        maxWidth: "500px",
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#ffe5e5",
        color: "#c62828",
        fontFamily: "Arial",
        textAlign: "center",
    },
};
