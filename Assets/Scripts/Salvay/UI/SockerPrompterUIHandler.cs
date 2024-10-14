using UnityEngine;
using DG.Tweening;
using TMPro;

public class SockerPrompterUIHandler : MonoBehaviour, SocketEventListener
{
    [SerializeField]
    private RectTransform popupTransform; // Reference to the UI element's RectTransform
    
    [SerializeField]
    private TMP_Text contentText; // Reference to the UI element's RectTransform
    
    private const float SlideDuration = 0.5f; // Duration for the slide-in and slide-out animations
    private const float StayDuration = 3.0f; // How long the popup stays before sliding back
    private Vector2 m_InitialPosition;
    private Vector2 m_HiddenPosition;

    public enum AnimatedUIState
    {
        Hidden,
        Visible,
        Animating
    }

    public AnimatedUIState animatedUIState = AnimatedUIState.Hidden; // Tracks the current state of the popup

    void Start()
    {
        SocketController.Instance.AddListener(this);
        
        // Store the initial position of the popup
        m_HiddenPosition = popupTransform.anchoredPosition;
        m_InitialPosition = new Vector2(m_HiddenPosition.x, m_HiddenPosition.y + popupTransform.rect.height);

        // Move the popup to the hidden position initially
        popupTransform.anchoredPosition = m_HiddenPosition;

        // Ensure the state is set to Hidden initially
        animatedUIState = AnimatedUIState.Hidden;
    }

    public void ShowPopup(string text)
    {
        if (animatedUIState == AnimatedUIState.Hidden)
        {
            // Set the text of the popup
            contentText.text = text;
            // Update the state to Animating
            animatedUIState = AnimatedUIState.Animating;
            
            // Slide in to the initial position
            popupTransform.DOAnchorPos(m_InitialPosition, SlideDuration).SetUpdate(UpdateType.Normal,true).SetEase(Ease.OutCubic).OnComplete(() =>
            {
                // Update the state to Visible after the animation completes
                animatedUIState = AnimatedUIState.Visible;

                // Wait for the stay duration and then slide back out
                DOVirtual.DelayedCall(StayDuration, () =>
                {
                    HidePopup();
                }).SetUpdate(UpdateType.Normal,true);
            });
        }
    }

    public void HidePopup()
    {
        if (animatedUIState == AnimatedUIState.Visible)
        {
            // Update the state to Animating
            animatedUIState = AnimatedUIState.Animating;

            // Slide out to the hidden position
            popupTransform.DOAnchorPos(m_HiddenPosition, SlideDuration).SetEase(Ease.InCubic).SetUpdate(UpdateType.Normal,true).OnComplete(() =>
            {
                // Update the state to Hidden after the animation completes
                animatedUIState = AnimatedUIState.Hidden;
            });
        }
    }
    
    public void OnSocketMessageReceived(SocketEventsType eventType, string payLoad = null)
    {
        ShowPopup(string.Format(eventType.GetStringForType(), payLoad));
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
