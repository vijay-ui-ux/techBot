import { Component, ElementRef, Host, HostListener, SimpleChanges, ViewChild, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { BotServiceService } from './bot-service.service';
import { SkeletonLoaderComponent } from "./skeleton-loader/skeleton-loader.component";
import { ConversationsComponent } from "./conversations/conversations.component";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, SkeletonLoaderComponent, ConversationsComponent,
            FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  faCopy = faCopy;
  title = 'techBot';
  userMessage: string = '';
  chatHistory: { message: string; isUser: boolean, codeSnippet: string, isLoading: boolean }[] = [];
  isActive: string = '';
botService = inject(BotServiceService);
http = inject(HttpClient);
@ViewChild('chatHistoryContainer') chatHistoryContainer!: ElementRef;
@ViewChild('selectImage') selectImage!: ElementRef;
@ViewChild('selectVideo') selectVideo!: ElementRef;
@HostListener('window:click', ['$event'])
onWindowClick(event: any) {
  console.log('event.target', event.target['className']);
  if (event.target !== this.selectImage.nativeElement && event.target !== this.selectVideo.nativeElement && event.target['className'] !== 'add-icon') {
    this.isActive = 'inactive';
  }
}

constructor(private toastr: ToastrService) {}
ngOnChanges(simpleChanges: SimpleChanges) {


  console.log('simpleChanges', simpleChanges);

}

scrollToBottom() {
  setTimeout(() => {
    let lastChild = this.chatHistoryContainer.nativeElement.children[this.chatHistoryContainer.nativeElement.children.length - 1];
    lastChild.scrollIntoView({ behavior: 'smooth' });
  }, 0);
}
  sendMessage() {

   
    if (this.userMessage.trim()!== '') {
      this.chatHistory.push({ message: this.userMessage, isUser: true, codeSnippet: '', isLoading: false });
      this.scrollToBottom();
      const message = this.userMessage;
      this.userMessage = '';
      
      this.chatHistory.push({ message: 'Loading...', isUser: false, codeSnippet: '', isLoading: true });
      this.scrollToBottom();
      this.http.post<any>('https://techbot-ai-backend.vercel.app/api/chat', { message }).subscribe({
        next: (data) => {
          this.chatHistory[this.chatHistory.length - 1] = { message: data.response, isUser: false, codeSnippet: data.code_snippet, isLoading: false };
          this.scrollToBottom();
        },
        error: (error) => {
          console.error('Error:', error);
          this.chatHistory[this.chatHistory.length - 1] = { message: 'Error communicating with chatbot.', isUser: false, codeSnippet: '' , isLoading: false};
          this.chatHistoryContainer.nativeElement.scrollTop = this.chatHistoryContainer.nativeElement.scrollHeight;
        }
      });
    }
  }
  
  addImage() {
    this.selectImage.nativeElement.click();
  }
  copyCode() {
      const codeSnippet = document.getElementById("copy")?.textContent;
      navigator.clipboard.writeText(codeSnippet || "");
      this.toastr.success('Copied to Clipboard!', 'Success', {
        timeOut: 1000,
      })
  }
  openFileInput() {
    this.isActive = this.isActive === 'active' ? 'inactive' : 'active';
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type }); // Convert to Blob
    const formData = new FormData();

      formData.append('image', file);
      this.chatHistory.push({ message: 'Loading...', isUser: false, codeSnippet: '', isLoading: true });
      this.http.post('http://localhost:8000/api/checkImage', formData).subscribe({
        next: (response: any) => {
          //... handle the response from the backend
          console.log(response, 'file uploaded');
          this.chatHistory[this.chatHistory.length - 1] = { message: response.response, isUser: false, codeSnippet: '', isLoading: false };
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }
  onVideoAudioSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type }); // Convert to Blob
    const formData = new FormData();

      formData.append('video', file);
      this.chatHistory.push({ message: 'Loading...', isUser: false, codeSnippet: '', isLoading: true });
      this.http.post('http://localhost:8000/api/videoTOText', formData).subscribe({
        next: (response: any) => {
          //... handle the response from the backend
          console.log(response, 'file uploaded');
          this.chatHistory[this.chatHistory.length - 1] = { message: response.response, isUser: false, codeSnippet: '', isLoading: false };
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }
}

