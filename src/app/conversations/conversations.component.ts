import { Component } from '@angular/core';

@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [],
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.scss'
})
export class ConversationsComponent {

  conversations: string[] = ['conversation 1', 'conversation 2', 'conversation 3', 'conversation 4', 'conversation 5', 
                              'conversation 6', 'conversation 7', 'conversation 8', 'conversation 9', 'conversation 10',
                              'conversation 11', 'conversation 12', 'conversation 13', 'conversation 14', 'conversation 15',
                              'conversation 16', 'conversation 17', 'conversation 18', 'conversation 19', 'conversation 20',
                              'conversation 21', 'conversation 22', 'conversation 23', 'conversation 24', 'conversation 25',
                              'conversation 26', 'conversation 27', 'conversation 28', 'conversation 29', 'conversation 30'
                            ];
}
