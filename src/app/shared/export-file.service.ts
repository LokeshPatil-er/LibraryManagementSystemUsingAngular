import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface ColumnHeader{
  key:string;
  value:string;
}

@Injectable({
  providedIn: 'root'
})
export class ExportFileService {

  constructor() { }


  fileSave(filename:string,filedata:Blob){

    const url=window.URL.createObjectURL(filedata);
    const linkTag=document.createElement('a');
    linkTag.download=filename
    linkTag.href=url
    linkTag.click();
    window.URL.revokeObjectURL(url);

  }

  exportToExcel(filename:string,data:any[],headers:ColumnHeader[])
  {

    const formattedData=data.map(row=>{
      const obj: any = {};
      headers.forEach(h => obj[h.value] = row[h.key]);
      return obj;
    })

    const worksheet:XLSX.WorkSheet=XLSX.utils.json_to_sheet(formattedData,{header:headers.map(h=>h.value)});
    const workbook:XLSX.WorkBook={Sheets:{'data':worksheet},SheetNames:['data']};
    const excelbuffer:any=XLSX.write(workbook,{bookType:'xlsx',type:'array'});
    const fileBlobData=new Blob([excelbuffer],{type:'application/octet-stream'});

    this.fileSave(`${filename}.xlsx`,fileBlobData);
  }

  exportToCSV(filename:string,data:any[],header:ColumnHeader[])
  {
    let csv=header.map(h=>`"${h.value}"`).join(',')+'\n';

    data.forEach(row=>{
      csv+=header.map(h=>`"${(row[h.key] ?? '').toString().replace(/"/g, '""')}"`).join(',') + '\n';
    });


    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    this.fileSave(filename,blob)
  }


  exportToPdf(filename:string,data:any[],header:ColumnHeader[])
  {
    const doc = new jsPDF({
      orientation: 'portrait',  
      unit: 'pt',                 
      format: 'a4'               
    });

    const head=[header.map(h=>h.value)]
    const body=data.map(row=>(
      header.map(h=>row[h.key])
    ))

    doc.setFontSize(14);
    doc.text(filename, 20, 20);


    autoTable(doc,{
      startY:40,
      head:head,
      body:body,
      margin: { left: 20, right: 20 },
      styles: { fontSize: 10 },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'  
      },
      theme: 'striped',
      pageBreak: 'auto'
    })

    doc.save(`${filename}.pdf`)
  }
}
