import json

def compactar_agressivo():
    with open('vercel.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    sources = [r['source'] for r in data.get('redirects', [])]
    destino = "/a-transicao-do-risco-da-numismatica-classica-aos-algoritmos-de-recompensa-variavel-na-era-digital"
    
    # Vamos extrair a "raiz" de cada link (o primeiro nível da URL)
    # Exemplo: /detalhe-tesauro-descricao/Alcatruz vira /detalhe-tesauro-descricao/
    raizes = set()
    for s in sources:
        partes = s.split('/')
        if len(partes) > 1:
            raizes.add(f"/{partes[1]}/")

    novos_redirects = []
    
    # Criamos uma regra Curinga para cada raiz detectada
    for raiz in sorted(raizes):
        if raiz == "//" or raiz == "/": continue
        
        novos_redirects.append({
            "source": f"{raiz}:path*",
            "destination": destino,
            "permanent": True
        })

    # Regras extras de segurança para WordPress e Datas
    regras_seguranca = [
        {"source": "/index.php/:path*", "destination": "/", "permanent": True},
        {"source": "/wp-content/:path*", "destination": "/", "permanent": True},
        {"source": "/(19|20):path*", "destination": destino, "permanent": True}
    ]
    
    for r in regras_seguranca:
        if r not in novos_redirects:
            novos_redirects.append(r)

    config_final = {
        "cleanUrls": True,
        "redirects": novos_redirects
    }

    with open('vercel_final.json', 'w', encoding='utf-8') as f:
        json.dump(config_final, f, indent=2, ensure_ascii=False)

    print(f"Compactação concluída!")
    print(f"De {len(sources)} links para {len(novos_redirects)} regras.")

compactar_agressivo()