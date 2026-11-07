import { useState, type FormEvent } from "react";
import { ArrowDownRight, ArrowUpRight, BrainCircuit, Bot, Check, ChevronDown, Code2, Compass, Layers3, Mail, Menu, MessageCircle, Monitor, Network, PenTool, Phone, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import "./styles/globals.css";
import "./styles/redesign.css";

const WHATSAPP = "525538107582";
const EMAIL = "dreamszit0999@gmail.com";

const services = [
  { number:"01", id:"consultoria", icon:Compass, name:"Estrategia y consultoría", intro:"Diagnóstico, dirección y acompañamiento para tomar mejores decisiones.", items:["Diagnóstico tecnológico y consultoría","Estrategia digital y marketing","Planeación de presencia y comunicación de marca","Acompañamiento e implementación"], result:"Un plan claro, prioridades y decisiones tecnológicas con sentido." },
  { number:"02", id:"creativo", icon:PenTool, name:"Marketing y diseño digital", intro:"Contenido visual y materiales digitales para comunicar, posicionar y vender.", items:["Diseño de publicaciones, carruseles e historias para redes sociales","Identidad visual, flyers, banners y materiales promocionales","Creatividades para campañas y anuncios digitales","Calendarios de contenido y adaptación de formatos"], result:"Una presencia digital coherente, profesional y preparada para conectar con clientes." },
  { number:"03", id:"digital", icon:Layers3, name:"Publicaciones y productos digitales", intro:"Convertimos ideas y conocimiento en publicaciones y recursos listos para compartir o comercializar.", items:["Creación, diseño y maquetación de ebooks","Manuales, guías, catálogos y documentos digitales","Preparación de archivos para Amazon KDP y publicación digital","Plantillas, recursos descargables y materiales formativos"], result:"Productos digitales terminados, organizados y listos para distribuir." },
  { number:"04", id:"software", icon:Code2, name:"Software, dashboards y automatización", intro:"Herramientas digitales que ordenan la información y simplifican el trabajo.", items:["Desarrollo de software a medida y aplicaciones web","Dashboards ejecutivos, indicadores y reportes","Sistemas de gestión, inventario, ventas y control operativo","Automatización de tareas e integración de herramientas"], result:"Procesos más visibles y eficientes, con información útil para decidir." },
  { number:"05", id:"comercio", icon:Monitor, name:"Puntos de venta y tecnología comercial", intro:"Equipamos y ponemos en marcha soluciones tecnológicas para comercios.", items:["Sistemas TPV / POS para tiendas y puntos de venta","Configuración de caja, lector de códigos y periféricos","Impresoras, escáneres, terminales y accesorios","Instalación, puesta en marcha y capacitación básica"], result:"Un punto de venta funcional, conectado y listo para operar." },
  { number:"06", id:"soporte", icon:Zap, name:"Soporte y reparación de computadoras", intro:"Mantenimiento y puesta a punto de equipos para recuperar su rendimiento.", items:["Diagnóstico, mantenimiento preventivo y reparación de PC","Limpieza interna, optimización y solución de fallas","Actualización de memoria RAM, SSD y componentes compatibles","Instalación de sistema operativo, programas y respaldo de información"], result:"Equipos confiables, optimizados y adaptados a las necesidades de trabajo." },
  { number:"07", id:"labs", icon:BrainCircuit, name:"Inteligencia artificial e investigación", intro:"Integramos nuevas capacidades con arquitectura, criterio y control.", items:["Automatización asistida por IA","Integración de modelos, agentes y herramientas","Arquitecturas multiagente y Meta-Orchestrator","Gobernanza, evaluación y validación de sistemas inteligentes"], result:"Soluciones inteligentes modulares, verificables e independientes de proveedor." }
];

const serviceDescriptions:Record<string,string> = {
  "Diagnóstico tecnológico y consultoría": "Revisamos tu operación, infraestructura y necesidades para identificar prioridades y oportunidades de mejora.",
  "Estrategia digital y marketing": "Definimos objetivos, canales y acciones digitales alineadas con tu negocio.",
  "Planeación de presencia y comunicación de marca": "Organizamos mensajes, identidad y puntos de contacto para comunicar con coherencia.",
  "Acompañamiento e implementación": "Te acompañamos desde la decisión hasta la puesta en marcha de la solución.",
  "Diseño de publicaciones, carruseles e historias para redes sociales": "Piezas visuales adaptadas a cada plataforma y formato, listas para publicar.",
  "Identidad visual, flyers, banners y materiales promocionales": "Material gráfico para presentar tu marca, productos, promociones o eventos.",
  "Creatividades para campañas y anuncios digitales": "Variantes visuales para comunicar ofertas y apoyar campañas publicitarias.",
  "Calendarios de contenido y adaptación de formatos": "Planificación de publicaciones y adaptación de piezas a distintos canales.",
  "Creación, diseño y maquetación de ebooks": "Estructuramos y diseñamos tu contenido para convertirlo en una publicación digital.",
  "Manuales, guías, catálogos y documentos digitales": "Documentos organizados y diseñados para informar, capacitar o presentar productos.",
  "Preparación de archivos para Amazon KDP y publicación digital": "Preparamos interiores y cubiertas conforme a los requisitos de publicación que correspondan.",
  "Plantillas, recursos descargables y materiales formativos": "Recursos digitales editables o listos para distribuir a tu audiencia.",
  "Desarrollo de software a medida y aplicaciones web": "Diseñamos herramientas web según tus procesos, usuarios y objetivos.",
  "Dashboards ejecutivos, indicadores y reportes": "Centralizamos datos relevantes en vistas que facilitan el seguimiento y la toma de decisiones.",
  "Sistemas de gestión, inventario, ventas y control operativo": "Organizamos registros y operaciones para dar visibilidad y control al negocio.",
  "Automatización de tareas e integración de herramientas": "Conectamos aplicaciones y reducimos tareas repetitivas mediante flujos automatizados.",
  "Sistemas TPV / POS para tiendas y puntos de venta": "Evaluamos e integramos una solución de caja adecuada al tipo de comercio.",
  "Configuración de caja, lector de códigos y periféricos": "Configuramos los componentes y verificamos su comunicación con el punto de venta.",
  "Impresoras, escáneres, terminales y accesorios": "Orientación e integración de periféricos compatibles para la operación comercial.",
  "Instalación, puesta en marcha y capacitación básica": "Dejamos el sistema preparado para operar y explicamos las funciones esenciales.",
  "Diagnóstico, mantenimiento preventivo y reparación de PC": "Identificamos fallas y proponemos mantenimiento o reparación según el estado del equipo.",
  "Limpieza interna, optimización y solución de fallas": "Mantenimiento físico y revisión del rendimiento y funcionamiento del sistema.",
  "Actualización de memoria RAM, SSD y componentes compatibles": "Evaluamos compatibilidad y opciones para mejorar capacidad y velocidad.",
  "Instalación de sistema operativo, programas y respaldo de información": "Configuración inicial, software necesario y respaldo según el alcance acordado.",
  "Automatización asistida por IA": "Identificamos tareas donde la IA puede apoyar procesos con supervisión y criterios claros.",
  "Integración de modelos, agentes y herramientas": "Conectamos capacidades de IA y herramientas según las necesidades del flujo de trabajo.",
  "Arquitecturas multiagente y Meta-Orchestrator": "Diseño conceptual y técnico de coordinación entre agentes, modelos y motores.",
  "Gobernanza, evaluación y validación de sistemas inteligentes": "Definimos controles, criterios de evaluación y validación independiente."
};

const projects = [
  { tag:"ARQUITECTURA · INVESTIGACIÓN", title:"Brionix Meta-Orchestrator", desc:"Una capa de coordinación para motores, agentes, modelos y herramientas. Selección por capacidades, independencia de proveedores y validación separada de la generación.", type:"research", label:"RESEARCH / 001" },
  { tag:"IMPLEMENTACIÓN · COMERCIO", title:"Sistemas de punto de venta", desc:"Integración de software, periféricos y configuración para digitalizar la operación cotidiana de comercios.", type:"commerce", label:"SOLUCIONES / 002" },
  { tag:"PUBLICACIÓN · RECURSOS", title:"Productos de conocimiento", desc:"Guías, publicaciones y herramientas digitales diseñadas para convertir experiencia en recursos prácticos.", type:"digital", label:"DIGITAL / 003" }
];

function Brand(){return <a className="brand" href="#inicio" aria-label="Brionix Systems, inicio"><img src="/brionix-symbol-approved.png" alt="Emblema oficial de luciérnaga Brionix Systems" /><span>BRIONIX<small>SYSTEMS</small></span></a>}

function ContactForm({service,setService}:{service:string;setService:(value:string)=>void}){

 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [phone,setPhone]=useState("");
 const [message,setMessage]=useState("");
 const [notice,setNotice]=useState("");
 const [whatsAppUrl,setWhatsAppUrl]=useState("");
 function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  const body=["Hola, Brionix Systems. Quiero conversar sobre un proyecto.","Nombre: "+name,"Correo: "+email,"WhatsApp: "+phone,"Área: "+service,"Proyecto: "+(message||"Me gustaría recibir orientación inicial.")].join("\n");
  const url="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(body);
  setWhatsAppUrl(url);
  window.open(url,"_blank","noopener,noreferrer");
  setNotice("Preparamos tu solicitud. Si WhatsApp no se abrió, utiliza el enlace de abajo para continuar.");
 }
 return <form className="contact-form" onSubmit={submit}>
  <div className="form-intro"><span className="eyebrow">CUÉNTANOS QUÉ NECESITAS</span><h3>Empecemos por lo importante.</h3><p>Unas líneas bastan para entender el reto y orientarte.</p></div>
  <label>¿En qué podemos ayudarte?<select value={service} onChange={e=>setService(e.target.value)} required><option value="">Selecciona un área</option>{service&&!services.some(s=>s.name===service)&&<option value={service}>{service}</option>}{services.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}<option value="Alianzas y nuevos proyectos">Alianzas y nuevos proyectos</option></select></label>
  <div className="form-grid"><label>Nombre<input value={name} onChange={e=>setName(e.target.value)} placeholder="Tu nombre" autoComplete="name" required/></label><label>WhatsApp<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+52 55..." autoComplete="tel" required/></label></div>
  <label>Correo electrónico<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="nombre@correo.com" autoComplete="email" required/></label>
  <label>Cuéntanos sobre tu proyecto<textarea rows={4} value={message} onChange={e=>setMessage(e.target.value)} placeholder="¿Qué quieres resolver, mejorar o construir?"/></label>
  <button className="button button-primary form-submit" type="submit">Enviar por WhatsApp <ArrowUpRight size={17}/></button>
  <p className="form-privacy">No almacenamos tus datos en este sitio. Se utilizan para preparar el mensaje que tú decides enviar.</p>
  {notice&&<p className="form-notice"><Check size={16}/>{notice}{whatsAppUrl&&<a href={whatsAppUrl} target="_blank" rel="noreferrer"> Abrir WhatsApp</a>}</p>}
 </form>
}


type AdvisorOption = { label:string; value:string };
const advisorPaths:Record<string,{service:string;question:string;options:AdvisorOption[]}> = {
  negocio:{service:"Estrategia y consultoría",question:"¿Qué te gustaría resolver primero?",options:[{label:"Organizar o mejorar mi negocio",value:"Consultoría y estrategia"},{label:"Digitalizar ventas o inventario",value:"Sistemas de gestión y ventas"},{label:"Mejorar mi presencia digital",value:"Marketing y diseño digital"},{label:"Todavía no lo tengo claro",value:"Orientación inicial"}]},
  creativo:{service:"Marketing y diseño digital",question:"¿Qué material necesitas?",options:[{label:"Publicaciones para redes sociales",value:"Diseño de publicaciones para redes"},{label:"Flyer, catálogo o identidad visual",value:"Flyer, catálogo o identidad visual"},{label:"Contenido para una campaña",value:"Creatividades para campañas"},{label:"Plan de contenido",value:"Calendario de contenido"}]},
  software:{service:"Software, dashboards y automatización",question:"¿Qué solución estás buscando?",options:[{label:"Sistema para mi negocio",value:"Sistema de gestión o software a medida"},{label:"Control de inventario y ventas",value:"Inventario y ventas"},{label:"Dashboard o reportes",value:"Dashboard y reportes"},{label:"Automatizar tareas",value:"Automatización de procesos"}]},
  comercio:{service:"Puntos de venta y tecnología comercial",question:"¿Qué necesitas para tu comercio?",options:[{label:"Punto de venta / caja",value:"Sistema TPV / POS"},{label:"Lector de códigos e impresora",value:"Escáner, impresora y periféricos"},{label:"Inventario y control de productos",value:"Inventario y control de productos"},{label:"Instalación y configuración",value:"Instalación y configuración"}]},
  digital:{service:"Publicaciones y productos digitales",question:"¿Qué quieres crear?",options:[{label:"Un ebook o libro",value:"Ebook o libro"},{label:"Un manual o guía",value:"Manual o guía"},{label:"Un catálogo digital",value:"Catálogo digital"},{label:"Publicar en Amazon KDP",value:"Publicación Amazon KDP"}]},
  soporte:{service:"Soporte y reparación de computadoras",question:"¿Qué sucede con tu equipo?",options:[{label:"Está lento o falla",value:"Equipo lento o con fallas"},{label:"Necesita mantenimiento",value:"Mantenimiento preventivo"},{label:"Quiero ampliar RAM o SSD",value:"Actualización de componentes"},{label:"Necesito instalar o configurar",value:"Instalación y configuración"}]},
  ia:{service:"Inteligencia artificial e investigación",question:"¿Qué te interesa explorar?",options:[{label:"Un asistente con IA",value:"Asistente con IA"},{label:"Automatizar un proceso con IA",value:"Automatización con IA"},{label:"Conectar modelos y herramientas",value:"Integración de modelos y herramientas"},{label:"Diseñar agentes",value:"Arquitectura de agentes"}]}
};
function VirtualAdvisor(){
 const [open,setOpen]=useState(false);
 const [step,setStep]=useState<"start"|"path"|"detail"|"contact"|"done">("start");
 const [path,setPath]=useState("");
 const [need,setNeed]=useState("");
 const [detail,setDetail]=useState("");
 const [business,setBusiness]=useState("");
 const [name,setName]=useState("");
 const [phone,setPhone]=useState("");
 const [email,setEmail]=useState("");
 const [sent,setSent]=useState(false);
 const [contactError,setContactError]=useState("");
 const selected=advisorPaths[path];
 function validateContact(){
  const cleanName=name.trim();
  const digits=phone.replace(/\D/g,"");
  const cleanEmail=email.trim();
  if(cleanName.length<2){setContactError("Escribe tu nombre (al menos 2 caracteres).");return false;}
  if(digits.length<10||digits.length>15||/^([0-9])\1+$/.test(digits)){setContactError("Ingresa un WhatsApp válido con lada. Usa entre 10 y 15 dígitos.");return false;}
  if(cleanEmail&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)){setContactError("Revisa el formato del correo o déjalo vacío.");return false;}
  setContactError("");
  return true;
 }
 function choosePath(value:string){setPath(value);setStep("path")}
 function chooseNeed(value:string){setNeed(value);setStep("detail")}
 function buildWhatsApp(){
  const message=["Hola, Brionix Systems. El Asesor Virtual me ayudó a preparar esta solicitud.","Nombre: "+(name||"Por proporcionar"),"WhatsApp: "+(phone||"Por proporcionar"),"Correo: "+(email||"No proporcionado"),"Tipo de negocio: "+(business||"No especificado"),"Área: "+(selected?.service||"Orientación general"),"Necesidad: "+(need||"Por definir"),"Detalles: "+(detail||"Solicito orientación inicial.")].join("\n");
  return "https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(message);
 }
 return <div className="advisor-widget">
  {open&&<section className="advisor-panel" aria-label="Asesor virtual Brionix">
   <header className="advisor-header"><div className="advisor-avatar"><Bot size={20}/></div><div><strong>Asesor Brionix</strong><span><i/> Asesor virtual · Gratuito</span></div><button type="button" aria-label="Cerrar asesor" onClick={()=>setOpen(false)}><X size={18}/></button></header>
   <div className="advisor-messages" aria-live="polite">
    <div className="advisor-bubble advisor-bot">¡Hola! Soy el asesor virtual de Brionix Systems. Te ayudaré a encontrar el servicio adecuado y preparar una solicitud para nuestro equipo.</div>
    {step!=="start"&&<div className="advisor-bubble advisor-user">{({negocio:"Quiero mejorar mi negocio",creativo:"Marketing y diseño",software:"Software y automatización",comercio:"Punto de venta y comercio",digital:"Ebooks y publicaciones",soporte:"Soporte de computadora",ia:"Inteligencia artificial"} as Record<string,string>)[path]}</div>}
    {step==="start"&&<><div className="advisor-bubble advisor-bot">¿En qué podemos ayudarte?</div><div className="advisor-options">{[{label:"Mi negocio",value:"negocio"},{label:"Marketing y diseño",value:"creativo"},{label:"Software y automatización",value:"software"},{label:"Punto de venta / comercio",value:"comercio"},{label:"Ebooks y publicaciones",value:"digital"},{label:"Soporte de computadora",value:"soporte"},{label:"Inteligencia artificial",value:"ia"}].map(o=><button key={o.value} onClick={()=>choosePath(o.value)}>{o.label}<ArrowUpRight size={13}/></button>)}</div></>}
    {step==="path"&&selected&&<><div className="advisor-bubble advisor-bot">{selected.question}</div><div className="advisor-options">{selected.options.map(o=><button key={o.value} onClick={()=>chooseNeed(o.value)}>{o.label}<ArrowUpRight size={13}/></button>)}</div></>}
    {step==="detail"&&<><div className="advisor-bubble advisor-user">{need}</div><div className="advisor-bubble advisor-bot">Perfecto. Cuéntame brevemente qué necesitas, qué problema quieres resolver o qué resultado esperas.</div><label className="advisor-field"><span>Detalles del proyecto</span><textarea value={detail} onChange={e=>setDetail(e.target.value)} rows={3} placeholder="Por ejemplo: tengo una tienda y necesito controlar productos y ventas."/></label><button className="advisor-next" onClick={()=>setStep("contact")}>Continuar <ArrowUpRight size={15}/></button></>}
    {step==="contact"&&<><div className="advisor-bubble advisor-bot">Ya casi está. Comparte tus datos para preparar el mensaje. Solo se enviarán a WhatsApp cuando tú pulses el botón.</div><label className="advisor-field"><span>Nombre <b aria-hidden="true">*</b></span><input value={name} onChange={e=>{setName(e.target.value);setContactError("");}} placeholder="Tu nombre" autoComplete="name" required maxLength={80}/></label><label className="advisor-field"><span>Negocio (opcional)</span><input value={business} onChange={e=>setBusiness(e.target.value)} placeholder="Ej. Dulcería, taller, profesional" maxLength={100}/></label><label className="advisor-field"><span>WhatsApp de contacto <b aria-hidden="true">*</b></span><input type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={e=>{setPhone(e.target.value);setContactError("");}} placeholder="+52 55 1234 5678" required maxLength={24}/></label><label className="advisor-field"><span>Correo (opcional)</span><input type="email" autoComplete="email" value={email} onChange={e=>{setEmail(e.target.value);setContactError("");}} placeholder="nombre@correo.com" maxLength={120}/></label>{contactError&&<p className="advisor-error" role="alert">{contactError}</p>}<p className="advisor-required-note">* Datos necesarios para que nuestro equipo pueda contactarte.</p><button className="advisor-next" onClick={()=>{if(validateContact())setStep("done");}}>Revisar solicitud <ArrowUpRight size={15}/></button></>}
    {step==="done"&&<><div className="advisor-bubble advisor-bot">¡Listo! Preparé el resumen de tu necesidad. Revisa el mensaje antes de enviarlo a Brionix por WhatsApp.</div><div className="advisor-summary"><span>REVISA TU SOLICITUD ANTES DE ENVIAR</span><strong>{selected?.service||"Orientación inicial"}</strong><p><b>Necesidad:</b> {need}</p><p><b>Nombre:</b> {name.trim()}</p><p><b>WhatsApp:</b> {phone.trim()}</p>{email.trim()&&<p><b>Correo:</b> {email.trim()}</p>}{business.trim()&&<p><b>Negocio:</b> {business.trim()}</p>}<small><b>Detalles:</b> {detail.trim()||"Solicito orientación inicial."}</small></div><p className="advisor-review-note">Verifica que tus datos sean correctos. WhatsApp se abrirá únicamente cuando pulses el botón.</p><button className="advisor-edit" type="button" onClick={()=>setStep("contact")}>Editar mis datos</button><a className="advisor-send" href={buildWhatsApp()} target="_blank" rel="noreferrer" onClick={()=>setSent(true)}><MessageCircle size={16}/> {sent?"Abrir WhatsApp nuevamente":"Confirmar y abrir WhatsApp"}</a><button className="advisor-reset" onClick={()=>{setStep("start");setPath("");setNeed("");setDetail("");setBusiness("");setName("");setPhone("");setEmail("");setSent(false);setContactError("")}}>Iniciar otra consulta</button></>}
   </div>
   <footer className="advisor-footer"><Sparkles size={12}/> Orientación inicial gratuita · Sin registro</footer>
  </section>}
  <button className="advisor-launcher" type="button" onClick={()=>setOpen(v=>!v)} aria-label={open?"Cerrar asesor virtual":"Abrir asesor virtual"}>{open?<X size={22}/>:<><MessageCircle size={21}/><span>¿Te ayudamos?</span></>}</button>
 </div>
}

export default function App(){
 const [menuOpen,setMenuOpen]=useState(false);
 const [expanded,setExpanded]=useState<string|null>(null);
 const [inquiryService,setInquiryService]=useState("");
 const nav=[["Nosotros","#nosotros"],["Servicios","#servicios"],["Proyectos","#proyectos"],["Cómo trabajamos","#proceso"],["Contacto","#contacto"]];
 return <div className="site-shell" id="inicio">
  <header className="topbar"><div className="container nav-wrap"><Brand/><button className="mobile-menu" onClick={()=>setMenuOpen(v=>!v)} aria-label={menuOpen?"Cerrar menú":"Abrir menú"}>{menuOpen?<X/>:<Menu/>}</button><nav className={menuOpen?"nav-links open":"nav-links"}>{nav.map(([label,href])=><a key={href} href={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav><a className="nav-cta" href="#contacto">Hablemos <ArrowUpRight size={15}/></a></div></header>
  <main>
   <section className="hero container">
    <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-rule"/> TECNOLOGÍA · INTELIGENCIA · EVOLUCIÓN</p><h1>La tecnología debe resolver algo.<em> Hagamos que suceda.</em></h1><p className="hero-lead">Diseñamos e integramos soluciones para negocios y personas: desde la estrategia y la operación diaria hasta productos digitales e inteligencia artificial.</p><div className="hero-actions"><a className="button button-primary" href="#servicios">Explorar soluciones <ArrowUpRight size={17}/></a><a className="text-link" href="#nosotros">Conocer Brionix <ArrowDownRight size={17}/></a><a className="text-link hero-whatsapp-cta" href={"https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent("Hola, Brionix Systems. Quiero recibir información y cotizar un servicio.")} target="_blank" rel="noreferrer">Cotizar por WhatsApp <ArrowUpRight size={16}/></a></div><div className="hero-proof"><span><Zap/> Soluciones aplicables</span><span><ShieldCheck/> Criterio y confianza</span><span><Layers3/> Visión de sistema</span></div></div>
    <div className="hero-visual hero-logo-lockup"><img className="hero-logo-image" src="/brionix-logo-lockup-approved.png" alt="BRIONIX SYSTEMS — Illuminating the Future of Intelligence"/></div>
    <div className="hero-ribbon"><span>DISEÑO PARA REDES</span><i/><span>EBOOKS Y PUBLICACIONES</span><i/><span>SOFTWARE Y DASHBOARDS</span><i/><span>TPV / POS</span><i/><span>SOPORTE DE PC</span></div>
   </section>

   <section className="about-section section" id="nosotros"><div className="container"><div className="section-top"><span>01 / NOSOTROS</span><span>UNA COMPAÑÍA · CAPACIDADES CONECTADAS</span></div><div className="about-grid"><h2>Convertimos ideas y necesidades en <em>soluciones que funcionan.</em></h2><div className="about-copy"><p>Brionix Systems es una firma de tecnología e integración. Combinamos pensamiento estratégico, herramientas digitales y ejecución práctica para resolver retos reales.</p><p>No vendemos tecnología por acumular herramientas. Entendemos el problema, elegimos lo que aporta valor y construimos una solución que pueda crecer.</p></div></div><div className="purpose-grid"><article className="purpose-card"><span className="purpose-label">NUESTRO PROPÓSITO / MISIÓN</span><div className="purpose-icon"><Compass/></div><h3>Hacer útil la tecnología.</h3><p>Transformar necesidades reales en valor mediante consultoría, integración, diseño, automatización y soluciones digitales orientadas a resultados.</p></article><article className="purpose-card vision-card"><span className="purpose-label">NUESTRO HORIZONTE / VISIÓN</span><div className="purpose-icon"><Network/></div><h3>Construir sistemas que evolucionan.</h3><p>Desarrollar un ecosistema tecnológico modular, accesible e independiente que conecte capacidades y amplíe lo que personas y organizaciones pueden lograr.</p></article></div><div className="principles"><span>01 <b>Claridad antes que complejidad</b></span><span>02 <b>Integración antes que aislamiento</b></span><span>03 <b>Innovación con responsabilidad</b></span><span>04 <b>Evolución continua</b></span></div></div></section>

   <section className="services-section section" id="servicios"><div className="container"><div className="section-top"><span>02 / QUÉ HACEMOS</span><span>CATÁLOGO DE SERVICIOS</span></div><div className="section-heading"><div><p className="eyebrow">CAPACIDADES BRIONIX</p><h2>Un socio tecnológico.<br/><em>Soluciones de principio a fin.</em></h2></div><p>Explora nuestros servicios. Desde una pieza gráfica o una reparación, hasta software, sistemas comerciales y soluciones de inteligencia artificial.</p></div><div className="service-list">{services.map(s=>{const Icon=s.icon;const open=expanded===s.id;return <article className={open?"service-item expanded":"service-item"} key={s.id}><button className="service-trigger" onClick={()=>setExpanded(open?null:s.id)} aria-expanded={open}><span className="service-number">{s.number}</span><span className="service-icon"><Icon/></span><span className="service-title"><small>{s.id==="labs"?"BRIONIX LABS":s.id==="digital"?"BRIONIX DIGITAL":s.id==="comercio"?"BRIONIX COMMERCE":"BRIONIX SERVICES"}</small><strong>{s.name}</strong><em>{s.intro}</em></span><span className="service-action">{open?"Cerrar":"Ver alcance"} <ChevronDown/></span></button>{open&&<div className="service-detail"><div><span className="detail-caption">SERVICIOS DISPONIBLES</span>{s.items.map(item=><article className="service-offer" key={item}><div className="offer-copy"><h4>{item}</h4><p>{serviceDescriptions[item]}</p></div><button type="button" className="offer-cta" onClick={()=>{setInquiryService(s.name+" — "+item);setExpanded(null);document.getElementById("contacto")?.scrollIntoView({behavior:"smooth"})}}>Cotizar este servicio <ArrowUpRight size={15}/></button></article>)}</div><div className="service-outcome"><span className="detail-caption">QUÉ OBTIENES</span><p>{s.result}</p><a href="#contacto" onClick={()=>{setInquiryService(s.name);setExpanded(null)}}>Solicitar cotización <ArrowUpRight size={16}/></a></div></div>}</article>})}</div></div></section>

   <section className="projects-section section" id="proyectos"><div className="container"><div className="section-top"><span>03 / PORTAFOLIO</span><span>TRABAJO APLICADO E INVESTIGACIÓN</span></div><div className="section-heading"><div><p className="eyebrow">LO QUE ESTAMOS CONSTRUYENDO</p><h2>Ideas con dirección.<br/><em>Trabajo con propósito.</em></h2></div><p>Una muestra de nuestras líneas de trabajo: implementación práctica, recursos digitales e investigación tecnológica.</p></div><div className="project-grid">{projects.map((p,i)=><article className={"project-card project-"+p.type} key={p.title}><div className="project-art"><span>{p.label}</span><div className="project-glyph">{i===0?<Network/>:i===1?<Monitor/>:<Code2/>}</div><small>BRIONIX / 00{i+1}</small></div><div className="project-content"><span className="eyebrow">{p.tag}</span><h3>{p.title}</h3><p>{p.desc}</p><a href="#contacto" onClick={()=>setInquiryService(p.title)}>Solicitar información <ArrowUpRight size={16}/></a></div></article>)}</div><div className="research-note"><div className="research-symbol"><BrainCircuit/></div><div><span className="eyebrow">LÍNEA DE INVESTIGACIÓN</span><h3>Meta-Orchestrator: coordinar inteligencia, no encerrarla.</h3><p>Exploramos una arquitectura donde diferentes modelos, agentes y herramientas colaboran bajo criterios de capacidad, gobernanza y validación independiente.</p></div><a href="#contacto">Conversar sobre innovación <ArrowUpRight/></a></div></div></section>

   <section className="process-section section" id="proceso"><div className="container"><div className="section-top"><span>04 / CÓMO TRABAJAMOS</span><span>DE LA NECESIDAD A LA SOLUCIÓN</span></div><div className="section-heading"><div><p className="eyebrow">MÉTODO BRIONIX</p><h2>Un proceso claro.<br/><em>Resultados con dirección.</em></h2></div><p>Cada proyecto comienza entendiendo el problema y termina con una solución implementada, documentada y preparada para evolucionar.</p></div><div className="process-grid"><article><span>01</span><h3>Diagnóstico</h3><p>Escuchamos tu necesidad, revisamos el contexto y definimos qué debe resolverse.</p></article><article><span>02</span><h3>Diseño de solución</h3><p>Proponemos alcance, entregables, herramientas, tiempos y una ruta de trabajo.</p></article><article><span>03</span><h3>Implementación</h3><p>Diseñamos, desarrollamos, configuramos o integramos la solución acordada.</p></article><article><span>04</span><h3>Evolución</h3><p>Entregamos, documentamos y definimos los siguientes pasos de mejora o soporte.</p></article></div></div></section>

   <section className="contact-section section" id="contacto"><div className="container"><div className="section-top"><span>05 / CONTACTO</span><span>EL PRÓXIMO PASO EMPIEZA CON UNA CONVERSACIÓN</span></div><div className="contact-grid"><div className="contact-copy"><p className="eyebrow">HABLEMOS DE TU PROYECTO</p><h2>Cuéntanos el reto.<em> Diseñemos el siguiente paso.</em></h2><p>Cuéntanos qué necesitas y te ayudaremos a encontrar la solución adecuada. Sin complicaciones y con expectativas claras.</p><a className="contact-line" href={"https://wa.me/"+WHATSAPP} target="_blank" rel="noreferrer"><Phone/><span><small>WHATSAPP</small>+52 55 3810 7582</span><ArrowUpRight/></a><a className="contact-line" href={"mailto:"+EMAIL}><Mail/><span><small>CORREO</small>{EMAIL}</span><ArrowUpRight/></a></div><ContactForm service={inquiryService} setService={setInquiryService}/></div></div></section>
  </main>
  <VirtualAdvisor/>\n  <footer className="footer"><div className="container footer-main"><Brand/><p>Ideas into systems.<br/>Technology · Intelligence · Growth</p><a href="#inicio">VOLVER AL INICIO ↑</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} BRIONIX SYSTEMS. TODOS LOS DERECHOS RESERVADOS.</span><span>TECNOLOGÍA CON PROPÓSITO.</span></div></footer>
 </div>
}
