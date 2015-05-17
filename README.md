# ui.bootstrap.progresscircle

Circular progress bar for AngularJS Bootstrap.

## Usage

```javascript
$scope.progress = 0.8;
```

```html
<circle-progress ng-model="progress"></circle-progress>
```

| Property  | Description     | Required | Default |
|-----------|-----------------|----------|---------|
| ngModel   | [min] to [max]  | true     |         |
| min       | 0               | false    | 0       |
| max       | 1               | false    | 1       |
| thickness | Thickness bar   | false    | 10      |
| offset    | Degree offset, starting at the right middle going clockwise. | false | 270 |

Style the bar by assigning a class or globally with the `progress-circle` class.

```
.progress-circle path {
    fill: #29B6F6;
}
```