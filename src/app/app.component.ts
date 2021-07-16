import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  color = '#ffffff';

  ngOnInit(): void {
    chrome.storage.sync.get('color', ({ color }) => {
      this.color = color;
    });
  }

  public updateColor(color: string) {
    chrome.storage.sync.set({ color});
  }

  public colorize() {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.executeScript(
          tabs[0].id!,
          { code: `document.body.style.backgroundColor = '${ this.color }';` }
        );
      });
      // V3 API, uncomment once supported
      // chrome.scripting.executeScript({
      //   target: {
      //     tabId: tabs[0].id!,
      //   },
      //   function: () => document.body.style.backgroundColor = this.color
      // })
  }
}
