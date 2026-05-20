# Vocabulario Técnico — Logística México-USA

> El agente debe dominar este vocabulario en ambos idiomas sin confusión. Esta lista alimenta el system prompt y los datasets de entrenamiento del comportamiento del agente.

---

## Términos de transporte

| Español | Inglés | Definición breve |
|---------|--------|------------------|
| Carga consolidada | LTL (Less Than Truckload) | Carga que no llena un camión completo |
| Carga completa | FTL (Full Truckload) | Camión dedicado a un solo embarque |
| Cross-docking | Cross-docking | Transferencia directa sin almacenamiento |
| Última milla | Last mile | Tramo final hasta destino |
| Hub | Hub | Centro de distribución |
| Drayage | Drayage | Movimiento corto puerto–almacén |
| Intermodal | Intermodal | Múltiples modos (camión + tren + barco) |

## Documentos de embarque

| Español | Inglés | Uso |
|---------|--------|-----|
| Carta porte | Bill of Lading (B/L) | Documento principal de transporte |
| Factura comercial | Commercial invoice | Valor declarado de la mercancía |
| Lista de empaque | Packing list | Detalle físico (cajas, peso, dimensiones) |
| Pedimento | Customs declaration | Documento aduanal (México) |
| Manifiesto de carga | Cargo manifest | Lista total del transporte |
| Certificado de origen | Certificate of origin | Origen para tratados (USMCA) |
| AWB | Air Waybill | B/L para carga aérea |

## Términos aduanales

| Español | Inglés | Definición |
|---------|--------|------------|
| Aduana | Customs | Autoridad de comercio internacional |
| Agente aduanal | Customs broker | Profesional que tramita despacho |
| Despacho aduanal | Customs clearance | Proceso de liberación de mercancía |
| Fracción arancelaria | HTS code (Harmonized Tariff Schedule) | Clasificación de mercancía |
| Regla de origen | Rule of origin | Criterios para tratados |
| Aforo | Inspection | Revisión física de mercancía |
| Reconocimiento aduanero | Customs examination | Revisión documental + física |
| Garantía | Bond | Garantía financiera para liberar mercancía |
| Almacén fiscal | Bonded warehouse | Almacenamiento temporal sin pagar impuestos |

## Programas y certificaciones

| Sigla | Significado | Aplica para |
|-------|-------------|-------------|
| **CTPAT** | Customs-Trade Partnership Against Terrorism | Importadores certificados USA |
| **OEA** | Operador Económico Autorizado | Equivalente mexicano CTPAT |
| **USMCA / T-MEC** | US-Mexico-Canada Agreement | Tratado de libre comercio |
| **NOM** | Norma Oficial Mexicana | Estándares de producto MX |
| **FCC** | Federal Communications Commission | Regulación electrónica USA |
| **FDA** | Food and Drug Administration | Alimentos y farmacéuticos USA |
| **DOT** | Department of Transportation | Regulación transporte USA |
| **SCT** | Secretaría de Comunicaciones y Transportes | Equivalente mexicano DOT |

## Incoterms (los más comunes en MX-USA)

| Sigla | Inglés completo | Quién paga qué |
|-------|----------------|----------------|
| **EXW** | Ex Works | Comprador paga todo desde fábrica |
| **FCA** | Free Carrier | Vendedor entrega a transportista designado |
| **CPT** | Carriage Paid To | Vendedor paga transporte hasta destino |
| **CIP** | Carriage and Insurance Paid | CPT + seguro |
| **DAP** | Delivered at Place | Vendedor paga hasta destino, comprador descarga |
| **DDP** | Delivered Duty Paid | Vendedor paga absolutamente todo |
| **FOB** | Free On Board | Específico para marítimo |
| **CIF** | Cost, Insurance and Freight | FOB + seguro + flete |

## Términos operativos

| Español | Inglés |
|---------|--------|
| Recolección / pickup | Pickup |
| Entrega | Delivery |
| Tránsito | In transit |
| Demoras | Delays |
| Detención | Detention |
| Estadía | Demurrage |
| Tarifa por kilómetro | Rate per mile |
| Combustible (recargo) | Fuel surcharge |
| Vacío | Empty |
| Cargado | Loaded |
| Sellado | Sealed |
| Roto / dañado | Damaged |
| Faltante | Short / shortage |
| Sobrante | Overage |

## Tipos de mercancía con requisitos especiales

- **Perecederos:** refrigeración, certificado fitosanitario, USDA
- **Peligrosos (DG):** clasificación UN, declaración de mercancía peligrosa, hojas de seguridad
- **Sobredimensionados:** permisos especiales, escolta
- **Farmacéuticos:** FDA, cadena de frío, control de temperatura
- **Electrónica:** FCC, posibles licencias de exportación (BIS)
- **Textiles:** TPL/USMCA, etiquetado

## Eventos típicos a comunicar

| Evento | Mensaje al cliente |
|--------|-------------------|
| Pickup confirmado | "Tu carga fue recolectada en [origen] a las [hora]" |
| En tránsito | "Tu carga está en ruta a [destino], ETA [fecha]" |
| Cruce de frontera | "Tu carga cruzó la frontera por [Laredo/Otay/etc.]" |
| Despacho iniciado | "Tu carga está en proceso aduanal" |
| Liberada | "Tu carga fue liberada, en ruta a entrega final" |
| Entregada | "Entrega confirmada a las [hora]. Recibió: [nombre]" |
| Demora | "Detectamos demora — causa: [X]. Nueva ETA: [X]" |
| Aforo | "Tu carga está bajo revisión aduanal — no requiere acción de tu parte" |
| Daño detectado | "Detectamos daño parcial — fotos enviadas, póliza activada" |

## Modismos y expresiones del corredor

Estos los usa el agente con naturalidad porque el cliente los usa:

- "El embarque" / "the shipment" / "la carga"
- "Liberar la carga" — clear customs
- "Caer en aforo" — get pulled for inspection
- "Cruzar el puente" — cross the border (puentes Laredo, Pharr, etc.)
- "Bajar la carga" — unload
- "Subir la carga" — load
- "Operador" — driver
- "Tractor" — truck cab
- "Caja" — trailer
- "Hacer maniobra" — handle / move
- "Sellos" — seals (security)

---

## Errores típicos a evitar (anti-patterns del agente)

- Confundir "factura comercial" con "factura fiscal"
- Traducir "pedimento" como "petition" — es **customs declaration**
- Asumir que un cliente USA entiende términos en español sin contexto
- Asumir que un transportista mexicano entiende términos en inglés sin traducción
- Mezclar incoterms (DDP no es lo mismo que DAP)
- Usar "shipment" cuando el cliente dice "embarque" — el agente debe espejar el término

---

## Fuentes para validación continua

- [USMCA / T-MEC text](https://ustr.gov/trade-agreements/free-trade-agreements/united-states-mexico-canada-agreement)
- [CBP — Customs and Border Protection](https://www.cbp.gov)
- [SAT — Aduana México](https://www.sat.gob.mx)
- [Incoterms 2020 (ICC)](https://iccwbo.org/business-solutions/incoterms-rules/)

> El agente nunca cita estas fuentes al cliente directamente — pero su entrenamiento debe estar alineado con ellas. Cuando un cliente pregunte algo que el agente no sabe, escala al despachador humano del cliente.
