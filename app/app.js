/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
const renderComponent = require("./lib/glimmer/render-component");
const strip = require("@glimmer/util").strip;
renderComponent(strip`
<page>
  <actionbar title="{{this.title}}">
    <label text="Hello From {{this.title}}"  class="action-label"></label>
  </actionbar>

  <scrollview sdkExampleTitle sdkToggleNavButton>
    <gridlayout class="m-15" rows="{{repeat-auto this.items.length}}">
      {{#each this.items key="@index" as |item i|}}
        <Row @i={{i}} @item={{item}} />
      {{/each}}
    </gridlayout>
  </scrollview>
</page>
`, { title: 'Glimmer Native', items: ['a', 'b', 'c'] });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
