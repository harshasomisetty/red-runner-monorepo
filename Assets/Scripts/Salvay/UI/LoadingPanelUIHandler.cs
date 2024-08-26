using System;
using Best.SocketIO;
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
using TMPro;

public class LoadingPanelUIHandler : MonoBehaviour, SocketEventListener
{
    [SerializeField]
    private RectTransform popupTransform; // Reference to the UI element's RectTransform
    
    [SerializeField]
    private Image panelBackgroundImage; // Reference to the UI element's RectTransform
    
    [SerializeField]
    private TMP_Text contentText; // Reference to the UI element's RectTransform
    
    private const float SlideDuration = 0.5f; // Duration for the slide-in and slide-out animations
    // private const float StayDuration = 3.0f; // How long the popup stays before sliding back
    
    private Vector2 m_ShowingPosition;
    private Vector2 m_HiddenPosition;
    
    private const float TIME_TO_SHOW_FOR = 60.0f;

    private bool m_IsTimeBased = true;
    private Tween m_hideTween = null;
    

    public enum PopupState
    {
        Hidden,
        Visible,
        Animating
    }

    private PopupState popupState = PopupState.Hidden; // Tracks the current state of the popup

    void Start()
    {
        SocketController.Instance.AddListener(this);
        
        // Store the initial position of the popup
        m_HiddenPosition = popupTransform.anchoredPosition;
        m_ShowingPosition = new Vector2(0,0);

        // Move the popup to the hidden position initially
        popupTransform.anchoredPosition = m_HiddenPosition;

        // Ensure the state is set to Hidden initially
        popupState = PopupState.Hidden;
    }

    public void ShowPopup(string text,bool _isTimeBased)
    {
        if (popupState == PopupState.Hidden)
        {
            panelBackgroundImage.gameObject.SetActive(true);
            // Set the text of the popup
            contentText.text = text;
            m_IsTimeBased = _isTimeBased;
            // Update the state to Animating
            popupState = PopupState.Animating;
            
            if(m_IsTimeBased)
                Invoke(nameof(HidePopup), TIME_TO_SHOW_FOR);
            
            // Slide in to the initial position
            var tween = popupTransform.DOAnchorPos(m_ShowingPosition, SlideDuration).SetEase(Ease.OutCubic).OnComplete(() =>
            {
                // Update the state to Visible after the animation completes
                popupState = PopupState.Visible;
                m_hideTween?.Kill(false);
                
                // Wait for the stay duration and then slide back out
                // m_hideTween = DOVirtual.DelayedCall(StayDuration, () =>
                // {
                //     HidePopup();
                // });
            });
        }
    }
    
    public void HidePopup()
    {
        if (popupState == PopupState.Visible)
        {
            // Update the state to Animating
            popupState = PopupState.Animating;

            // Slide out to the hidden position
            var tween = popupTransform.DOAnchorPos(m_HiddenPosition, SlideDuration).SetEase(Ease.InCubic).OnComplete(() =>
            {
                // Update the state to Hidden after the animation completes
                popupState = PopupState.Hidden;
                panelBackgroundImage.gameObject.SetActive(false);
            });
            
            CancelInvoke(nameof(HidePopup));
            m_hideTween?.Kill(false);
            m_hideTween = null;
        }
    }

    public void OnSocketMessageReceived(string messageHeader)
    {
        //only auto hide this popup for asset mints not payouts//
        if(messageHeader.Contains("Asset Minted"))
            HidePopup();
    }

    public void RemoveListener()
    {
        SocketController.Instance.RemoveListener(this);
    }

    private void OnDestroy()
    {
        RemoveListener();
    }
}
