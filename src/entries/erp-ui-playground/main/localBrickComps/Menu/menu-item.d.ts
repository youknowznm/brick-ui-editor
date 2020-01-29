/**
 * @file menu
 * @author wujun07
 * @owner wujun07:2019-10-11
 */
import * as React from 'react';
import { GenericCheckboxProps } from '@befe/brick-comp-checkbox';
import { MenuContext } from './menu-context';
import { MenuItemId } from './common';
declare type LiAttributes = Omit<React.LiHTMLAttributes<HTMLLIElement>, 'id'>;
declare type PropsFromCheckbox = Pick<GenericCheckboxProps, 'indeterminate'>;
export interface MenuItemProps extends LiAttributes, PropsFromCheckbox {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 唯一标识
     */
    id?: MenuItemId;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 点击回调
     */
    onClick?: (e: React.MouseEvent) => void;
    /**
     * 类型（暂定）
     */
    type?: 'normal' | 'checkbox';
    /**
     * 是否选中控制值
     * 如不控制，则以是否在 context.selectedId 进行判断是否选中
     */
    selected?: boolean;
}
/**
 * MenuItem
 * @description brick component MenuItem
 * @for-mobx
 */
export declare class MenuItem extends React.Component<MenuItemProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
        disabled: boolean;
        type: string;
    };
    static contextType: React.Context<import("./menu-context").MenuContextValue>;
    context: React.ContextType<typeof MenuContext>;
    get className(): string;
    get type(): "normal" | "checkbox" | undefined;
    get multiple(): boolean | undefined;
    get liProps(): {
        onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
        disabled?: boolean | undefined;
        hidden?: boolean | undefined;
        dir?: string | undefined;
        slot?: string | undefined;
        title?: string | undefined;
        color?: string | undefined;
        children?: React.ReactNode;
        type?: "normal" | "checkbox" | undefined;
        onSelect?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        value?: string | number | string[] | undefined;
        onMouseEnter?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onMouseLeave?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onChange?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onFocus?: ((event: React.FocusEvent<HTMLLIElement>) => void) | undefined;
        onBlur?: ((event: React.FocusEvent<HTMLLIElement>) => void) | undefined;
        defaultChecked?: boolean | undefined;
        defaultValue?: string | number | string[] | undefined;
        suppressContentEditableWarning?: boolean | undefined;
        suppressHydrationWarning?: boolean | undefined;
        accessKey?: string | undefined;
        contentEditable?: boolean | undefined;
        contextMenu?: string | undefined;
        draggable?: boolean | undefined;
        lang?: string | undefined;
        placeholder?: string | undefined;
        spellCheck?: boolean | undefined;
        tabIndex?: number | undefined;
        radioGroup?: string | undefined;
        role?: string | undefined;
        about?: string | undefined;
        datatype?: string | undefined;
        inlist?: any;
        prefix?: string | undefined;
        property?: string | undefined;
        resource?: string | undefined;
        typeof?: string | undefined;
        vocab?: string | undefined;
        autoCapitalize?: string | undefined;
        autoCorrect?: string | undefined;
        autoSave?: string | undefined;
        itemProp?: string | undefined;
        itemScope?: boolean | undefined;
        itemType?: string | undefined;
        itemID?: string | undefined;
        itemRef?: string | undefined;
        results?: number | undefined;
        security?: string | undefined;
        unselectable?: "on" | "off" | undefined;
        inputMode?: "search" | "none" | "text" | "decimal" | "numeric" | "tel" | "url" | "email" | undefined;
        is?: string | undefined;
        'aria-activedescendant'?: string | undefined;
        'aria-atomic'?: boolean | "false" | "true" | undefined;
        'aria-autocomplete'?: "none" | "both" | "inline" | "list" | undefined;
        'aria-busy'?: boolean | "false" | "true" | undefined;
        'aria-checked'?: boolean | "mixed" | "false" | "true" | undefined;
        'aria-colcount'?: number | undefined;
        'aria-colindex'?: number | undefined;
        'aria-colspan'?: number | undefined;
        'aria-controls'?: string | undefined;
        'aria-current'?: boolean | "time" | "page" | "false" | "true" | "step" | "location" | "date" | undefined;
        'aria-describedby'?: string | undefined;
        'aria-details'?: string | undefined;
        'aria-disabled'?: boolean | "false" | "true" | undefined;
        'aria-dropeffect'?: "link" | "none" | "copy" | "move" | "execute" | "popup" | undefined;
        'aria-errormessage'?: string | undefined;
        'aria-expanded'?: boolean | "false" | "true" | undefined;
        'aria-flowto'?: string | undefined;
        'aria-grabbed'?: boolean | "false" | "true" | undefined;
        'aria-haspopup'?: boolean | "dialog" | "menu" | "listbox" | "grid" | "false" | "true" | "tree" | undefined;
        'aria-hidden'?: boolean | "false" | "true" | undefined;
        'aria-invalid'?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;
        'aria-keyshortcuts'?: string | undefined;
        'aria-label'?: string | undefined;
        'aria-labelledby'?: string | undefined;
        'aria-level'?: number | undefined;
        'aria-live'?: "off" | "assertive" | "polite" | undefined;
        'aria-modal'?: boolean | "false" | "true" | undefined;
        'aria-multiline'?: boolean | "false" | "true" | undefined;
        'aria-multiselectable'?: boolean | "false" | "true" | undefined;
        'aria-orientation'?: "horizontal" | "vertical" | undefined;
        'aria-owns'?: string | undefined;
        'aria-placeholder'?: string | undefined;
        'aria-posinset'?: number | undefined;
        'aria-pressed'?: boolean | "mixed" | "false" | "true" | undefined;
        'aria-readonly'?: boolean | "false" | "true" | undefined;
        'aria-relevant'?: "all" | "text" | "additions" | "additions text" | "removals" | undefined;
        'aria-required'?: boolean | "false" | "true" | undefined;
        'aria-roledescription'?: string | undefined;
        'aria-rowcount'?: number | undefined;
        'aria-rowindex'?: number | undefined;
        'aria-rowspan'?: number | undefined;
        'aria-selected'?: boolean | "false" | "true" | undefined;
        'aria-setsize'?: number | undefined;
        'aria-sort'?: "none" | "ascending" | "descending" | "other" | undefined;
        'aria-valuemax'?: number | undefined;
        'aria-valuemin'?: number | undefined;
        'aria-valuenow'?: number | undefined;
        'aria-valuetext'?: string | undefined;
        dangerouslySetInnerHTML?: {
            __html: string;
        } | undefined;
        onCopy?: ((event: React.ClipboardEvent<HTMLLIElement>) => void) | undefined;
        onCopyCapture?: ((event: React.ClipboardEvent<HTMLLIElement>) => void) | undefined;
        onCut?: ((event: React.ClipboardEvent<HTMLLIElement>) => void) | undefined;
        onCutCapture?: ((event: React.ClipboardEvent<HTMLLIElement>) => void) | undefined;
        onPaste?: ((event: React.ClipboardEvent<HTMLLIElement>) => void) | undefined;
        onPasteCapture?: ((event: React.ClipboardEvent<HTMLLIElement>) => void) | undefined;
        onCompositionEnd?: ((event: React.CompositionEvent<HTMLLIElement>) => void) | undefined;
        onCompositionEndCapture?: ((event: React.CompositionEvent<HTMLLIElement>) => void) | undefined;
        onCompositionStart?: ((event: React.CompositionEvent<HTMLLIElement>) => void) | undefined;
        onCompositionStartCapture?: ((event: React.CompositionEvent<HTMLLIElement>) => void) | undefined;
        onCompositionUpdate?: ((event: React.CompositionEvent<HTMLLIElement>) => void) | undefined;
        onCompositionUpdateCapture?: ((event: React.CompositionEvent<HTMLLIElement>) => void) | undefined;
        onFocusCapture?: ((event: React.FocusEvent<HTMLLIElement>) => void) | undefined;
        onBlurCapture?: ((event: React.FocusEvent<HTMLLIElement>) => void) | undefined;
        onChangeCapture?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onBeforeInput?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onBeforeInputCapture?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onInput?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onInputCapture?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onReset?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onResetCapture?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onSubmit?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onSubmitCapture?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onInvalid?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onInvalidCapture?: ((event: React.FormEvent<HTMLLIElement>) => void) | undefined;
        onLoad?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onLoadCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onError?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onErrorCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onKeyDown?: ((event: React.KeyboardEvent<HTMLLIElement>) => void) | undefined;
        onKeyDownCapture?: ((event: React.KeyboardEvent<HTMLLIElement>) => void) | undefined;
        onKeyPress?: ((event: React.KeyboardEvent<HTMLLIElement>) => void) | undefined;
        onKeyPressCapture?: ((event: React.KeyboardEvent<HTMLLIElement>) => void) | undefined;
        onKeyUp?: ((event: React.KeyboardEvent<HTMLLIElement>) => void) | undefined;
        onKeyUpCapture?: ((event: React.KeyboardEvent<HTMLLIElement>) => void) | undefined;
        onAbort?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onAbortCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onCanPlay?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onCanPlayCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onCanPlayThrough?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onCanPlayThroughCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onDurationChange?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onDurationChangeCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onEmptied?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onEmptiedCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onEncrypted?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onEncryptedCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onEnded?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onEndedCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onLoadedData?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onLoadedDataCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onLoadedMetadata?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onLoadedMetadataCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onLoadStart?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onLoadStartCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onPause?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onPauseCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onPlay?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onPlayCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onPlaying?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onPlayingCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onProgress?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onProgressCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onRateChange?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onRateChangeCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onSeeked?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onSeekedCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onSeeking?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onSeekingCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onStalled?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onStalledCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onSuspend?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onSuspendCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onTimeUpdate?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onTimeUpdateCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onVolumeChange?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onVolumeChangeCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onWaiting?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onWaitingCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onAuxClick?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onAuxClickCapture?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onClickCapture?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onContextMenu?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onContextMenuCapture?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onDoubleClick?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onDoubleClickCapture?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onDrag?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragCapture?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragEnd?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragEndCapture?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragEnter?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragEnterCapture?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragExit?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragExitCapture?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragLeave?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragLeaveCapture?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragOver?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragOverCapture?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragStart?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDragStartCapture?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDrop?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onDropCapture?: ((event: React.DragEvent<HTMLLIElement>) => void) | undefined;
        onMouseDown?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onMouseDownCapture?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onMouseMove?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onMouseMoveCapture?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onMouseOut?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onMouseOutCapture?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onMouseOver?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onMouseOverCapture?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onMouseUp?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onMouseUpCapture?: ((event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined;
        onSelectCapture?: ((event: React.SyntheticEvent<HTMLLIElement, Event>) => void) | undefined;
        onTouchCancel?: ((event: React.TouchEvent<HTMLLIElement>) => void) | undefined;
        onTouchCancelCapture?: ((event: React.TouchEvent<HTMLLIElement>) => void) | undefined;
        onTouchEnd?: ((event: React.TouchEvent<HTMLLIElement>) => void) | undefined;
        onTouchEndCapture?: ((event: React.TouchEvent<HTMLLIElement>) => void) | undefined;
        onTouchMove?: ((event: React.TouchEvent<HTMLLIElement>) => void) | undefined;
        onTouchMoveCapture?: ((event: React.TouchEvent<HTMLLIElement>) => void) | undefined;
        onTouchStart?: ((event: React.TouchEvent<HTMLLIElement>) => void) | undefined;
        onTouchStartCapture?: ((event: React.TouchEvent<HTMLLIElement>) => void) | undefined;
        onPointerDown?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerDownCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerMove?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerMoveCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerUp?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerUpCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerCancel?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerCancelCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerEnter?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerEnterCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerLeave?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerLeaveCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerOver?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerOverCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerOut?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onPointerOutCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onGotPointerCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onGotPointerCaptureCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onLostPointerCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onLostPointerCaptureCapture?: ((event: React.PointerEvent<HTMLLIElement>) => void) | undefined;
        onScroll?: ((event: React.UIEvent<HTMLLIElement>) => void) | undefined;
        onScrollCapture?: ((event: React.UIEvent<HTMLLIElement>) => void) | undefined;
        onWheel?: ((event: React.WheelEvent<HTMLLIElement>) => void) | undefined;
        onWheelCapture?: ((event: React.WheelEvent<HTMLLIElement>) => void) | undefined;
        onAnimationStart?: ((event: React.AnimationEvent<HTMLLIElement>) => void) | undefined;
        onAnimationStartCapture?: ((event: React.AnimationEvent<HTMLLIElement>) => void) | undefined;
        onAnimationEnd?: ((event: React.AnimationEvent<HTMLLIElement>) => void) | undefined;
        onAnimationEndCapture?: ((event: React.AnimationEvent<HTMLLIElement>) => void) | undefined;
        onAnimationIteration?: ((event: React.AnimationEvent<HTMLLIElement>) => void) | undefined;
        onAnimationIterationCapture?: ((event: React.AnimationEvent<HTMLLIElement>) => void) | undefined;
        onTransitionEnd?: ((event: React.TransitionEvent<HTMLLIElement>) => void) | undefined;
        onTransitionEndCapture?: ((event: React.TransitionEvent<HTMLLIElement>) => void) | undefined;
        selected?: boolean | undefined;
    };
    get isSelected(): boolean;
    get checkboxSize(): "sm" | "md" | undefined;
    handleClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
    renderPrefix(): JSX.Element | null;
    render(): JSX.Element;
}
export {};
